import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import './App.css';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <label>Test</label>
      <input {...register('test', { required: true })} />
      <p>{errors.test?.message}</p>
      <Controller
        defaultValue=""
        control={control}
        name="cardNumber"
        render={({ field }) => {
          return (
            <InputMask
              {...field}
              mask="9999-9999-9999-9999"
              maskChar={null}
              placeholder="Card number"
              className={classNames(`form-control`, {
                'is-valid': !!field.value,
                'is-invalid': !!errors.cardNumber,
              })}
            />
          );
        }}
      />
      <p>{errors.cardNumber?.message}</p>

      <button type="submit">Submit</button>
    </form>
  );
}
