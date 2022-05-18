import fs from 'fs';
import yaml from 'js-yaml';
import {
  EntityPolicies,
  DefaultNamespaceEntityPolicy,
  FieldFormatEntityPolicy,
  NoForeignRootFieldsEntityPolicy,
  SchemaValidEntityPolicy,
  apiEntityV1alpha1Validator,
  componentEntityV1alpha1Validator,
  groupEntityV1alpha1Validator,
  locationEntityV1alpha1Validator,
  userEntityV1alpha1Validator,
  systemEntityV1alpha1Validator,
  domainEntityV1alpha1Validator,
  resourceEntityV1alpha1Validator,
} from '@backstage/catalog-model';
import { templateEntityV1beta3Validator } from '@backstage/plugin-scaffolder-common';
import annotationSchema from './schemas/annotations.schema.json';
import Ajv from 'ajv';
import ajvFormats from 'ajv-formats';
import { relativeSpaceValidation } from './relativeSpaceValidation';

const ajv = new Ajv({ verbose: true });
ajvFormats(ajv);

const VALIDATORS = {
  api: apiEntityV1alpha1Validator,
  component: componentEntityV1alpha1Validator,
  group: groupEntityV1alpha1Validator,
  location: locationEntityV1alpha1Validator,
  template: templateEntityV1beta3Validator,
  user: userEntityV1alpha1Validator,
  system: systemEntityV1alpha1Validator,
  domain: domainEntityV1alpha1Validator,
  resource: resourceEntityV1alpha1Validator,
};

function modifyPlaceholders(obj) {
  for (const k in obj) {
    if (typeof obj[k] === 'object') {
      try {
        if (obj[k].$text) {
          obj[k] = 'DUMMY TEXT';
          return;
        }
      } catch (e) {
        throw new Error(
          `Placeholder with name '${k}' is empty. Please remove it or populate it.`,
        );
      }
      modifyPlaceholders(obj[k]);
    }
  }
}

export const validate = async (fileContents, verbose = true) => {
  let validator;
  const validateAnnotations = (entity, idx) => {
    if (!validator) {
      validator = ajv.compile(annotationSchema);
    }
    if (verbose) {
      console.log(`Validating entity annotations for file document ${idx}`);
    }
    const result = validator(entity);
    if (result === true) {
      return true;
    }

    const [error] = validator.errors || [];
    if (!error) {
      throw new Error(`Malformed annotation, Unknown error`);
    }

    throw new Error(
      `Malformed annotation, ${error.instancePath || '<root>'} ${
        error.message
      }`,
    );
  };

  try {
    const data = yaml.loadAll(fileContents);
    data.forEach(it => {
      modifyPlaceholders(it);
    });
    const entityPolicies = EntityPolicies.allOf([
      new DefaultNamespaceEntityPolicy(),
      new FieldFormatEntityPolicy(),
      new NoForeignRootFieldsEntityPolicy(),
      new SchemaValidEntityPolicy(),
    ]);
    const responses = await Promise.all(
      data.map(it => {
        return entityPolicies.enforce(it);
      }),
    );
    const validateEntityKind = async entity => {
      const results = {};
      for (const v of Object.entries(VALIDATORS)) {
        const result = await v[1].check(entity);
        results[v[0]] = result;
        if (result === true && verbose) {
          console.log(`Validated entity kind '${v[0]}' successfully.`);
        }
      }
      return results;
    };
    const validateEntities = async entities => {
      const results = await Promise.all(entities.map(validateEntityKind));
      return Object.values(results[0]).filter(r => r === false).length > 0;
    };
    const validKind = await validateEntities(data);
    const validAnnotations = data.map((it, idx) =>
      validateAnnotations(it, idx),
    );

    if (validKind && validAnnotations && verbose) {
      console.log('Entity Schema policies validated\n');
      responses.forEach(it => console.log(yaml.dump(it)));
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const validateFromFile = async (filepath, verbose = true) => {
  const fileContents = fs.readFileSync(filepath, 'utf8');
  if (verbose) {
    console.log(`Validating Entity Schema policies for file ${filepath}`);
  }

  await validate(fileContents, verbose);
  await relativeSpaceValidation(fileContents, filepath, verbose);
};
