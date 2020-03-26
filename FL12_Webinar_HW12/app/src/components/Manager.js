import React from "react";
import { Developer } from "./Developer";

export class Manager extends Developer {
  toString = () => {
    JSON.stringify({
      id: this.id,
      poolMemebers: this.poolMemebers
    });
  };

  render() {
    return (
      <div className="develper manager">
        <div className="managerName">{this.props.data.name}</div>
        <div className="children">
          {this.props.data.poolMemebers.map(item =>
            item.pool_name ? (
              <Manager key={item.id} data={item} />
            ) : (
              <Developer key={item.id} data={item} />
            )
          )}
        </div>
      </div>
    );
  }
}
