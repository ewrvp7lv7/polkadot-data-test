import React, { use, useState, FormEvent, FunctionComponent } from "react"
// import { IResult, listValidators, listValidatorsInEra, listBonded, listRewards } from './Substrate';
import * as Substrate from './substrate';

export interface IConfig {
  value: string;
  caption: string;
}

export const AddressForm: FunctionComponent<IConfig> = ({
  value, caption
}) => {

  const [fields, setFields] = useState<Substrate.IResult[]>([])

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    // We don't want the page to refresh
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    switch (value) {
      case "tab0":
        setFields(await Substrate.listValidators(formData.get("nominator") as string));
        break;
      case "tab1":
        setFields(await Substrate.listValidatorsInEra(formData.get("nominator") as string, Number(formData.get("era"))));
        break;
      case "tab2":
        setFields(await Substrate.listBonded(formData.get("nominator") as string, Number(formData.get("era"))));
        break;
        case "tab4":
          setFields(await Substrate.listRewards(formData.get("nominator") as string, Number(formData.get("era"))));
          break;
      default:
        console.debug("No such value exists");
        break;
    }

  }

  return (
    <>
      <div className="bg-yellow-100 px-4">
        <form onSubmit={submitForm} className="mb-6">
          <div className="mb-6">
            <label htmlFor="nominator" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nominator address</label>
            <input type="text" id="nominator" name="nominator" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" autoComplete="off" required />
          </div>
          {(value != "tab0") ?
            <div className="mb-6">
              <label htmlFor="era" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Num of era</label>
              <input type="text" id="era" name="era" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Number" autoComplete="off" required />
            </div> :
            <></>
          }

          <div className="text-right">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              Get data
            </button>
          </div>
        </form>
      </div>

      <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{caption}:</h2>
      <div className="bg-green-100  px-4">
        <ul className="max-w-fit space-y-1 text-gray-500 list-inside dark:text-gray-400">
          {fields.map(field => {
            return <>
              <li className="flex items-center">
                <svg className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                {field.address}
              </li>
            </>
          })}
        </ul>
      </div>

    </>
  )
}
