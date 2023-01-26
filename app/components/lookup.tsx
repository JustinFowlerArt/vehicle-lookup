import { Form } from "@remix-run/react";

const Lookup = () => {
  return (
    <Form method="get" action="/result">
      <label htmlFor='vin'>VIN</label>
      <input className='border border-blue-500' type="text" name="vin" />
      <label htmlFor='year'>Year</label>
      <input className='border border-blue-500' type="number" name="year" />
      <button type='submit'>Submit</button>
    </Form>
  );
}

export default Lookup;