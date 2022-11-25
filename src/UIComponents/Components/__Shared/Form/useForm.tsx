import React, {ChangeEvent, MouseEvent, useRef} from 'react';

/**
 * @desc Hook, used for generating input fields and event listeners on a form.
 */
export function useForm() {
  const formState = useRef<Record<string, string>>({});

  /**
   * @Private
   * @param name {string} -
   * @returns {object} an object with methods to attach to an input field.
   */
  function register(name: string) {
    return {
      onChange(e: ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        formState.current[name] = e.target.value;
      }
    };
  }

  /**
   * @public
   * @Returns {object} an object for the form button
   * @example <button ...submit(handler)/>
   * @param handleSubmit
   */
  function submit(handleSubmit: (formState: Record<string, string>) => void) {
    return {
      onClick(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        handleSubmit({...formState.current});
      }
    };
  }

  /**
   * @stub
   * @param name
   */
  function errors(name: string) {}

  /**
   * @public The main function of the hook, used to generate input fields
   * @example  <form> {generateFields([{name:string, type:number|text}]) </form>
   * @param fields
   */
  function generateFields({
    fields,
    formControlClassName = 'form-control'
  }: {
    fields: {name: string; type: string}[];
    formControlClassName?: string;
  }) {
    return fields.map(({name, type}) => {
      return (
        <div className={formControlClassName}>
          <label>{name}</label>
          <input name={name} type={type} {...register(name)} />
        </div>
      );
    });
  }

  return {
    register,
    submit,
    errors,
    generateFields
  };
}
