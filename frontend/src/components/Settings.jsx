import { useLocalStorage } from "usehooks-ts";
import Box from "./Box";
import Title from "./Title";
import Details from "./Details";
import Input from "./Form/Input";
export default function Settings() {
  const [isUserScriptInstalled] = useLocalStorage("userscript-install", false);
  const [apiKey, setApiKey] = useLocalStorage("api-key", "");
  return (
    <Box>
      <Title>設定</Title>
      {!isUserScriptInstalled ? (
        <div>請先安裝 UserScript。</div>
      ) : (
        <>
          <Input
            label="API Key"
            placeholder="請輸入 API Key"
            value={apiKey}
            type="password"
            id="api-key"
            onChange={(e) => setApiKey(e.target.value)}
          />
        </>
      )}
    </Box>
  );
}
