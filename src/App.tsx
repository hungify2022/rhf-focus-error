import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Input } from 'reactstrap';
import * as yup from 'yup';
import './App.css';

interface FormValues {
  cardNumber: string;
  test: string;
  nested: string;
}

const schema = yup.object().shape({
  cardNumber: yup.string().required('Card number is required'),
  test: yup.string().required('Test is required'),
  nested: yup.string().required('Nested is required'),
});

export default function App() {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        name="test"
        control={control}
        render={({ field: { ref, ...restField } }) => (
          <Input {...restField} innerRef={ref} type="text" />
        )}
      />
      <p>{errors.test?.message}</p>

      <Controller
        name="nested"
        control={control}
        render={({ field: { ref, ...restField } }) => (
          <Input {...restField} innerRef={ref} type="text" />
        )}
      />
      <p>{errors.nested?.message}</p>

      <Controller
        defaultValue=""
        control={control}
        name="cardNumber"
        render={({ field }) => {
          return (
            <InputMask
              {...field}
              mask="1-1-1"
              maskChar={null}
              alwaysShowMask={false}
              inputRef={field.ref}
            />
          );
        }}
      />
      <p>{errors.cardNumber?.message}</p>

      <button type="submit">Submit</button>
    </form>
  );
}
