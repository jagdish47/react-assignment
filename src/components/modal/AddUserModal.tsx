import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../store";
import { addUser } from "../../redux/users/userSlice";
import { isAlphabetical, isMobileNumberValidator, isRequiredValidator, isValidAge } from "../../utils/validators";

interface AppState {
  values: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    age: string;
  };
  errors: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    age: string;
  };
}

const initialState = {
  values: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
  },
  errors: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    age: "",
  },
};

const AddUserModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<AppState>(initialState);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const userDetails = {
        firstName: formData.values.firstName,
        lastName: formData.values.lastName,
        age: Number(formData.values.age),
        phoneNumber: Number(formData.values.phoneNumber),
      };

      dispatch(addUser(userDetails));

      setIsModalOpen(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      values: {
        ...formData.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  const validate = () => {

    let validationMessage =
      isRequiredValidator(formData.values.firstName) ||
      isAlphabetical(formData.values.firstName);

    if (validationMessage) {
      setFormData({
        ...formData,
        errors: {
          ...formData.errors,
          firstName: validationMessage || "",
        },
      });

      return false;
    }

    validationMessage =
      isRequiredValidator(formData.values.lastName) ||
      isAlphabetical(formData.values.lastName);

    if (validationMessage) {
      setFormData({
        ...formData,
        errors: {
          ...formData.errors,
          lastName: validationMessage || "",
        },
      });

      return false;
    }

    validationMessage =
    isRequiredValidator(formData.values.age) ||
      isValidAge(formData.values.age);

    if (validationMessage) {
      setFormData({
        ...formData,
        errors: {
          ...formData.errors,
          age: validationMessage || "",
        },
      });

      return false;
    }

    validationMessage =
    isRequiredValidator(formData.values.phoneNumber) ||
      isMobileNumberValidator(formData.values.phoneNumber);

    if (validationMessage) {
      setFormData({
        ...formData,
        errors: {
          ...formData.errors,
          phoneNumber: validationMessage || "",
        },
      });

      return false;
    }

    return true;
  }

  const handleOpen = () => {
     setIsModalOpen(true)
     setFormData(initialState)
  }

  return (
    <>
      <div>
        <button
          type="button"
          className="bg-black px-5 py-2.5 text-center text-sm font-medium text-white"
          onClick={handleOpen}
        >
          Add User
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0">
          <div className="relative mx-auto my-20 max-h-full max-w-md">
            <div className="relative mx-auto bg-white shadow-lg">
              <button
                type="button"
                className="absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 "
                onClick={() => setIsModalOpen(false)}
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 ">
                   User Details
                </h3>
                <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                     Enter First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                      value={formData.values.firstName}
                      onChange={handleChange}
                    />
                    <span className="text-red-500">
                      {formData.errors.firstName}
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="\ mb-2 block text-sm font-medium text-gray-900"
                    >
                     Enter Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                      value={formData.values.lastName}
                      onChange={handleChange}
                    />
                    <span className="text-red-500">
                      {formData.errors.lastName}
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      Enter Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      id="age"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                      value={formData.values.age}
                      onChange={handleChange}
                    />
                    <span className="text-red-500">{formData.errors.age}</span>
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="mb-2 block text-sm font-medium text-gray-900 "
                    >
                      Enter Phone Number
                    </label>
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 "
                      value={formData.values.phoneNumber}
                      onChange={handleChange}
                    />
                    <span className="text-red-500">
                      {formData.errors.phoneNumber}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddUserModal;
