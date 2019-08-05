"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gremlin_1 = require("gremlin");
const idKey = "id";
const labelKey = "label";
const valueKey = "value";
var serializers;
(function(serializers) {
  class EdgeSerializer {
    constructor(reader) {
      this.reader = reader;
    }
    serialize(item) {
      throw new Error("Method not implemented.");
    }
    deserialize(item) {
      let inV = this.reader.read({
        id: item.inV,
        label: item.inVLabel,
        type: "vertex"
      });
      let outV = this.reader.read({
        id: item.outV,
        label: item.outVLabel,
        type: "vertex"
      });
      let serialized = new gremlin_1.structure.Edge(0, outV, item.label, inV);
      let rawProperties = item.properties;
      let properties = Array();
      if (rawProperties !== undefined) {
        for (let [name, value] of Object.entries(rawProperties)) {
          properties.push(this.reader.read({ name, value }, "property"));
        }
      }
      if (properties.length > 0) {
        serialized.properties = properties;
      }
      serialized.id = item.id;
      return serialized;
    }
    canBeUsedFor(item) {
      return item instanceof gremlin_1.structure.Edge;
    }
  }
  serializers.EdgeSerializer = EdgeSerializer;
  class VertexSerializer {
    constructor(reader) {
      this.reader = reader;
    }
    deserialize(item) {
      let serialized = new gremlin_1.structure.Vertex(0, "");
      serialized.id = item[idKey];
      serialized.label = item[labelKey];
      if ("properties" in item) {
        let rawProperties = item["properties"];
        let properties = Array();
        for (let propertyName in rawProperties) {
          for (let property of rawProperties[propertyName]) {
            property.label = propertyName;
            properties.push(property);
          }
        }
        serialized.properties = this.reader.read(properties, "vertexProperty");
      }
      return serialized;
    }
    serialize(item) {
      throw new Error("Method not implemented.");
    }
    canBeUsedFor(item) {
      return item instanceof gremlin_1.structure.Vertex;
    }
  }
  serializers.VertexSerializer = VertexSerializer;
  class VertexPropertySerializer {
    constructor(reader) {
      this.reader = reader;
    }
    canBeUsedFor(item) {
      return item instanceof gremlin_1.structure.VertexProperty;
    }
    serialize(item) {
      throw new Error("Method not implemented.");
    }
    deserialize(item) {
      let serialized = new gremlin_1.structure.VertexProperty(0, "", null);
      let rawProperties = item.properties;
      let properties = Array();
      if (rawProperties !== undefined) {
        for (let [name, value] of Object.entries(rawProperties)) {
          properties.push(this.reader.read({ name, value }, "property"));
        }
      }
      serialized.id = item[idKey];
      serialized.label = item[labelKey];
      serialized.value = item[valueKey];
      serialized.properties = properties;
      return serialized;
    }
  }
  serializers.VertexPropertySerializer = VertexPropertySerializer;
  class PropertySerializer {
    constructor(reader) {
      this.reader = reader;
    }
    serialize(item) {
      throw new Error("Method not implemented.");
    }
    deserialize(item) {
      return new gremlin_1.structure.Property(item["name"], item[valueKey]);
    }
    canBeUsedFor(item) {
      return item instanceof gremlin_1.structure.Property;
    }
  }
  serializers.PropertySerializer = PropertySerializer;
})((serializers = exports.serializers || (exports.serializers = {})));
//# sourceMappingURL=type_serializers.js.map
