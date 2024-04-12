import ParamEditor from "./components/ParamEditor";

function App() {
  const model = {
    paramValues: [
      { paramId: 1, value: "Значение" },
      { paramId: 2, value: "Значение 2" }
    ],
    colors: [] // Вставьте здесь соответствующее значение для colors, если это необходимо
  };

  const params = [
    { id: 1, name: "Длина", type: "string" },
    { id: 2, name: "Ширина", type: "string" }
  ];

  return (
    <>
      <ParamEditor params={params} model={model} />
    </>
  );
}

export default App;
