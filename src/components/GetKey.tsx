import axios, { AxiosError } from "axios";
import { useState } from "react";

const APIURL = "https://random-todos.azurewebsites.net/keys";

export const GetKey = () => {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState<string>();

  return (
    <>
      <section>
        Om du har tappat bort din api-nyckel, använd följande formulär för att
        hämta den
      </section>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await axios.get<string>(
              `${APIURL}?email=${email}`
            );

            if (response.status === 200) {
              setApiKey(response.data);
            } else {
              setError(response.data);
            }
          } catch (error) {
            const e = error as AxiosError;
            setError(e.response?.data as string);
          }
        }}
      >
        <input
          type="email"
          placeholder="E-postadress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Hämta api-nyckel</button>
      </form>
      {apiKey !== "" && <section>Din api-nyckel: {apiKey}</section>}
      {error && <section className="error">{error}</section>}
    </>
  );
};
