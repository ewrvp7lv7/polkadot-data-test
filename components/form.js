import React, { useState } from "react"
import { ApiPromise, WsProvider } from '@polkadot/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [activeFilter, setActiveFilter] = useState([]);

  const [formSuccess, setFormSuccess] = useState(false)
  // const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e) => {
    // We don't want the page to refresh
    e.preventDefault()

    // const formURL = e.target.action
    // const data = new FormData()

    // // Turn our formData state into data we can use with a form submission
    // Object.entries(formData).forEach(([key, value]) => {
    //   data.append(key, value);
    // })

    // // POST the data to the URL of the form
    // fetch(formURL, {
    //   method: "POST",
    //   body: data,
    //   headers: {
    //     'accept': 'application/json',
    //   },
    // }).then((response) => response.json())
    // .then((data) => {
    //   setFormData({
    //     name: "",
    //     email: "",
    //     message: ""
    //   })

    // setFormSuccess(true)
    // setFormSuccessMessage(data.submission_text)
    // })


    const ALICE = '16Vks1DNod7LCk2LVGKDKFHGdufwzYrMrcX26MyxKPQG6u8X';

    async function main() {
      const wsProvider = new WsProvider('wss://rpc.polkadot.io');
      const api = await ApiPromise.create({ provider: wsProvider });
      const validators = await api.query.staking.nominators(ALICE);
      if (validators.toJSON() && validators.toJSON().hasOwnProperty("targets")) {
        // console.log(`ALICE account ${ALICE} has nominated the following validators\n\n`,
        //   JSON.stringify(validators.toJSON()["targets"], null, 2));

        // for (const [key, value] of Object.entries(obj)) {
        //   activeFilter
        // }
        setActiveFilter(Object.values(validators.toJSON()["targets"]));


      }
      // else {
      //   // console.log(`ALICE account ${ALICE} has not nominated any validators`);

      // }
    }

    // main().catch(console.error).finally(() => process.exit());
    main()

  }

  return (
    <div>
      <h1>Contact form</h1>
      {formSuccess ?
        <div>{formSuccessMessage}</div>
        :
        <form onSubmit={submitForm}>
          <div>
            <label>Name</label>
            <input type="text" name="name" onChange={handleInput} value={formData.name} />
          </div>

          <div>
            <label>Email</label>
            <input type="text" name="email" onChange={handleInput} value={formData.email} />
          </div>

          <div>
            <label>Message</label>
            <textarea name="message" onChange={handleInput} value={formData.message}></textarea>
          </div>

          <button type="submit">Send message</button>
        </form>
      }
      {activeFilter.map((todoList,index) => (
        <p key={index}>rrr {todoList}</p>
      ))}

    </div>
  )
}
