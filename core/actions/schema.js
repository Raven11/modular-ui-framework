import ReactJsonSchemaSingleton from '../schema_engine/ReactJsonSchemaSingleton';
import componentMap from '../component_map';
import Utils from '../schema_engine/Utils';
import jsonSchema from '../../app/schemas/root_schema';
import schemas from '../../app/schemas/index';

export function getSchemaContent() {
  const combinedSchemas = Utils.combineSchemas(schemas);
  const stylesheet = Utils.convertJsonToStylesheet(combinedSchemas.stylesheet);
  const reactSchema = new ReactJsonSchemaSingleton();
  reactSchema.setStylesheet(stylesheet);
  reactSchema.setComponentMap(componentMap);
  reactSchema.setLayouts(combinedSchemas.layouts);
  const view=reactSchema.parseRouteStack(combinedSchemas.appConfig);
  return {
    appSchema: jsonSchema,
    rootView: view
    };
}

export function setSchema(sch) {
  return {
    type: 'LOAD_SCHEMA',
    appSchema: sch.appSchema,
    rootView: sch.rootView,
    meta: {
      analytics: {
        eventType: 'track',
        eventPayload: {
          event: 'LOAD_SCHEMA',
          properties: {
            user: 'test_user',
            store: 'test_store',
            amount: 1000
          }
        }
        // eventType: 'screen',
        // eventPayload: {
        //   category: 'NAVIGATION',
        //   name: 'MAIN PAGE',
        //   properties: {
        //     name: 'test_user'
        //   }
        // }
        // eventType: 'identify',
        // eventPayload: {
        //   traits: {
        //     anonymousId: '3f050f0b-192e-4dca-856f-1142e7416ac2',
        //     name: 'test_user',
        //     userId: '3f050f0b-192e-4dca-856f-1142e7416ac2'
        //   }
        // }
      }
    }
  }
}

export function loadSchema() {
  let sch = getSchemaContent()
  return function (dispatch) {
    dispatch(setSchema(sch))
  }
}
