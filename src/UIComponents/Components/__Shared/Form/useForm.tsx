import React, {ChangeEvent, MouseEvent, useRef} from 'react';

export function useForm() {
  const formState = useRef<Record<string, string>>({});

  function register(name: string) {
    return {
      onChange(e: ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        formState.current[name] = e.target.value;

        console.log(formState.current);
      }
    };
  }

  function submit(handleSubmit: (formState: Record<string, string>) => void) {
    return {
      onClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        handleSubmit({...formState.current});
      }
    };
  }

  function errors(name: string) {}

  function generateFields(fields: {name: string; type: string}[]) {
    return fields.map(({name, type}) => {
      return <input name={name} type={type} {...register(name)} />;
    });
  }

  return {
    register,
    submit,
    errors,
    generateFields
  };
}
