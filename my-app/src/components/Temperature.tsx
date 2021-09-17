import React from "react";
import styled from "styled-components";
import UnitIcon from "./UnitIcon";

const Temperature = (props: { temp: number }) => {
  //   const [currUnit, setCurrUnit] = useState<null | string>(null);
  //   useEffect(() => {
  //     const currUnit = props.tempUnit;
  //     setCurrUnit(currUnit);
  //   }, [props]);

  //   const isCels = currUnit === "c" ? true : false;
  //   const unitIconSrc = isCels
  //     ? "../assets/images/celsius-white.png"
  //     : "../assets/images/celsius.png";
  //   const unitTitle = isCels ? "Change to Fahrenheit" : "Change to Celsius";
  //   console.log("My Temperature props:", props);

  return (
    <Temp>
      <h3>{props.temp}</h3>
      <UnitIcon />
    </Temp>
  );
};

// const cursorPointer = `&:hover {
//     cursor: pointer;
//   }`;

const Temp = styled.div`
  display: flex;
  align-items: center;
`;

// const mapStateToProps = (state: any) => {
//   return {
//     tempUnit: state.appStore.tempUnit,
//   };
// };

// const mapDispatchToProps = {
//   setUnit,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Temperature);
export default Temperature;
