/**
 * Ex03ValidationPage.jsx – Trang bài 3: Validation Form
 */
import { FormProvider } from '../context/FormContext';
import RegistrationForm from '../components/form/RegistrationForm';

export default function Ex03ValidationPage() {
  return (
    <FormProvider>
      <div className="container mt-5" style={{ maxWidth: '500px' }}>
        <h2 className="mb-4 text-center">Bài 3 – Validation Form</h2>
        <div className="card shadow-sm">
          <div className="card-body">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
