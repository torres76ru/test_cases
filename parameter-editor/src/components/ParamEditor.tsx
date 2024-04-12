import React, { ChangeEventHandler, ReactEventHandler } from "react";

interface Param {
  id: number;
  name: string;
  type: "string" | "number";
}
interface ParamValue {
  paramId: number;
  value: string;
}
interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
interface Props {
  params: Param[];
  model: Model;
}

interface State {
  model: Model;
}
type Color = {};

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      model: this.filterModelByParams(this.props.model, this.props.params)
    };
  }

  public getModel(): Model {
    return this.state.model;
  }

  filterModelByParams(model: Model, params: Param[]): Model {
    const filteredParamValues = model.paramValues.filter((paramValue) =>
      params.some((param) => param.id === paramValue.paramId)
    );
    return { ...model, paramValues: filteredParamValues };
  }

  handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { model } = this.state;
    const { value, name } = event.target;
    const paramId = parseInt(name);

    const updatedParamValues = model.paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        return { ...paramValue, value };
      }
      return paramValue;
    });

    this.setState({
      model: { ...model, paramValues: updatedParamValues }
    });
  };

  render() {
    const { model } = this.state;

    return (
      <div>
        {model.paramValues.map((paramValue, index) => (
          <div key={index}>
            <label htmlFor={paramValue.paramId.toString()}>
              {this.props.params.find((p) => p.id === paramValue.paramId)?.name}
            </label>
            <input
              type="text"
              name={paramValue.paramId.toString()}
              value={paramValue.value}
              onChange={this.handleInputChange}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ParamEditor;
