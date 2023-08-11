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
        <div className="text-gray-200 flex items-center flex-col justify-center w-full text-center">
          <i className="bx bx-error text-3xl"></i>
          未偵測到 UserScript，請先安裝 UserScript 或重新整理網頁。
        </div>
      ) : (
        <>
          <Input
            label="API 金鑰"
            placeholder="請在此貼上機器人給你的 API 金鑰"
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
