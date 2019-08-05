### Gremlin GraphSON v1 Reader/Writer

First, this is very far from complete. I'm publishing the package in tandem with an article I wrote about CosmosDB and its Gremlin API. I started this package in order to facilitate work that I'm doing. As such it is incomplete, currently containing only what I need right now.

_GraphSON_

> GraphSON is a JSON-based format that is designed for human readable output that is easily supported in any programming language through the wide-array of JSON parsing libraries that exist on virtually all platforms.

Sounds great doesn't it?

There are 3 versions of GraphSON to date. Changes from version 1 to version 2 were very drastic. Changes from version 2 to version 3 not so much.

CosmosDB _outputs_ all its data from the Gremlin API in GraphSON v2. This isn't bad, the `gremlin` library can handle GraphSON v2 and v3 fairly seamlessly.

The problem is that CosmosDB _*only accepts GraphSON v1 input*_. This is frustrating.

If you've decided to use this package as is, here are some of the features!

- Transpiled from Typescript so it's very ugly! (oh, no type declaration files yet)
- Only a few type deserializers created. Didn't actually write any serializers as CosmosDB accepts Graphson V2 just fine.
