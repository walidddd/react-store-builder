import React from 'react';
import DynamicComponent from '../../../../utils/Ui/DynamicComponent';
import { getComponentName } from '../../../../settings/fieldsMagicTools';

interface TlMagicProps {
  fields?: Array<any>; // Adjust the type of fields as per your data structure
  values?: any;
  onChangeField: (value: any, id: string) => void;
  className?: string;
}

const TlMagic: React.FC<TlMagicProps> = ({
  fields,
  values,
  onChangeField,
  className,
}) => {
  return (
    <div className={`tl ${className}`}>
      {/* Loop over fields and render DynamicComponent for each item */}

      {fields &&
        fields.map((field: any, index: any) => (
          <div key={index}>
            <DynamicComponent
              componentName={getComponentName(field?.type)}
              props={field}
              onChange={onChangeField}
              className="mt-4"
              value={values[field.id]}
              name={''}
              chosen={''}
              selected={''}
            />
          </div>
        ))}
    </div>
  );
};

export default TlMagic;
