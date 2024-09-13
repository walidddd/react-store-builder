import { createAsyncThunk } from '@reduxjs/toolkit';
import { TemplateSchema, section } from './../../proto/template_builder';

export const fetchSchemaData = createAsyncThunk(
  'schema/fetchSchemaData',
  async () => {
    const schemaTest: TemplateSchema = {
      schemaPage: 'Product page',
      sections: [
        {
          type: 'main-product',
          blocks: [
            {
              type: '',
              settings: {
                title: {
                  valueType: {
                    oneofKind: 'stringVar',
                    stringVar: '',
                  },
                },
              },
            },
          ],
          settings: {},
        },
        {
          type: 'recommendation',
          blocks: [
            {
              type: '',
              settings: {
                title: {
                  valueType: {
                    oneofKind: 'stringVar',
                    stringVar: 'dsadsadsa',
                  },
                },
              },
            },
          ],
          settings: {},
        },
      ],
      settings: {},
    };

    console.log(section)

    // Create TemplateSchema instance from the plain object
    const schema = TemplateSchema.create(schemaTest);

    // Log the created instance
    console.log(schema);
  }
);
