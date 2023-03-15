import { useEffect, useState } from "react";

export const ConvertedValues = ({ fromCurrency, toCurrency, amount }) => {
  const [maxValue, setMaxValue] = useState(null);
  const [minValue, setMinValue] = useState(null);

  // useEffect(() => {
  //   fetch(
  //     `https://prussian-blue-dugong-boot.cyclic.app/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
  //   ).then((response) => response.json());
  //   // fetch(`/convert?from=${fromCurrency}&to=${toCurrency}&amount`);
  // }, []);

  return (
    <>
      <p>{maxValue}</p>
      <p>{minValue}</p>
    </>
  );
};
