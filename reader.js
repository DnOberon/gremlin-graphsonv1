"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_serializers_1 = require("./type_serializers");
class GraphSONReaderV1 {
  read(obj, type) {
    if (obj === undefined) {
      return undefined;
    }
    if (obj === null) {
      return null;
    }
    if (Array.isArray(obj)) {
      return obj.map(item => this.read(item, type));
    }
    let typeSerializer = obj["type"];
    if (type) {
      typeSerializer = type;
    }
    if (SERIALIZERS[typeSerializer]) {
      let serializer = new SERIALIZERS[typeSerializer](this);
      return serializer.deserialize(obj);
    }
    if (obj && typeof obj === "object" && obj.constructor === Object) {
      return this._deserializeObject(obj);
    }
    return obj;
  }
  _deserializeObject(obj) {
    const keys = Object.keys(obj);
    const result = {};
    for (let i = 0; i < keys.length; i++) {
      result[keys[i]] = this.read(obj[keys[i]]);
    }
    return result;
  }
}
exports.GraphSONReaderV1 = GraphSONReaderV1;

const SERIALIZERS = {
  edge: type_serializers_1.serializers.EdgeSerializer,
  vertex: type_serializers_1.serializers.VertexSerializer,
  vertexProperty: type_serializers_1.serializers.VertexPropertySerializer,
  property: type_serializers_1.serializers.PropertySerializer
};

modules.exports = GraphSONReaderV1;
//# sourceMappingURL=reader.js.map
