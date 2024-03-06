import axios, { AxiosError } from "axios";
import { useState } from "react";

const APIURL = "https://random-todos.azurewebsites.net/keys/generate";

export const GenerateKey = () => {
  const [email, setEmail] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [error, setError] = useState<string>();

  return (
    <div>
      <section>
        Om du inte har en api-nyckel, använd detta formulär för att skapa en
      </section>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const response = await axios.post<string>(`${APIURL}`, { email });

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
        <button>Skapa api-nyckel</button>
      </form>
      {apiKey !== "" && <section>Din api-nyckel: {apiKey}</section>}
      {error && <section className="error">{error}</section>}
    </div>
  );
};
