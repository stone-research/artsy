/**
 * @generated SignedSource<<2c2e9f69bd3010023ef257b2d00a30da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ArtworkAttributionClassType = "LIMITED_EDITION" | "OPEN_EDITION" | "UNIQUE" | "UNKNOWN_EDITION" | "%future added value";
export type ArtworkImportSource = "CONVECTION" | "MY_COLLECTION" | "%future added value";
export type MyCollectionCreateArtworkInput = {
  artistIds?: ReadonlyArray<string | null> | null;
  artists?: ReadonlyArray<MyCollectionArtistInput | null> | null;
  artworkLocation?: string | null;
  attributionClass?: ArtworkAttributionClassType | null;
  category?: string | null;
  clientMutationId?: string | null;
  collectorLocation?: EditableLocation | null;
  confidentialNotes?: string | null;
  costCurrencyCode?: string | null;
  costMajor?: number | null;
  costMinor?: number | null;
  date?: string | null;
  depth?: string | null;
  editionNumber?: string | null;
  editionSize?: string | null;
  externalImageUrls?: ReadonlyArray<string | null> | null;
  height?: string | null;
  importSource?: ArtworkImportSource | null;
  isEdition?: boolean | null;
  medium?: string | null;
  metric?: string | null;
  pricePaidCents?: any | null;
  pricePaidCurrency?: string | null;
  provenance?: string | null;
  submissionId?: string | null;
  title: string;
  width?: string | null;
};
export type MyCollectionArtistInput = {
  displayName?: string | null;
};
export type EditableLocation = {
  address?: string | null;
  address2?: string | null;
  city?: string | null;
  coordinates?: ReadonlyArray<number> | null;
  country?: string | null;
  countryCode?: string | null;
  postalCode?: string | null;
  state?: string | null;
  stateCode?: string | null;
  summary?: string | null;
};
export type useCreateArtworkMutation$variables = {
  input: MyCollectionCreateArtworkInput;
};
export type useCreateArtworkMutation$data = {
  readonly myCollectionCreateArtwork: {
    readonly artworkOrError: {
      readonly artworkEdge?: {
        readonly __id: string;
        readonly node: {
          readonly images: ReadonlyArray<{
            readonly internalID: string | null;
          } | null> | null;
          readonly internalID: string;
        } | null;
      } | null;
      readonly mutationError?: {
        readonly message: string;
      } | null;
    } | null;
  } | null;
};
export type useCreateArtworkMutation = {
  response: useCreateArtworkMutation$data;
  variables: useCreateArtworkMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": [
    {
      "kind": "Literal",
      "name": "includeAll",
      "value": true
    }
  ],
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "images",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": "images(includeAll:true)"
},
v4 = {
  "kind": "ClientExtension",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__id",
      "storageKey": null
    }
  ]
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MyCollectionArtworkMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCreateArtworkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MyCollectionCreateArtworkPayload",
        "kind": "LinkedField",
        "name": "myCollectionCreateArtwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "artworkOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MyCollectionEdge",
                    "kind": "LinkedField",
                    "name": "artworkEdge",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "MyCollectionArtworkMutationSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCreateArtworkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MyCollectionCreateArtworkPayload",
        "kind": "LinkedField",
        "name": "myCollectionCreateArtwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "artworkOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MyCollectionEdge",
                    "kind": "LinkedField",
                    "name": "artworkEdge",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "id",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "MyCollectionArtworkMutationSuccess",
                "abstractKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ac918b0a5e93b91587dad854b1cce889",
    "id": null,
    "metadata": {},
    "name": "useCreateArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation useCreateArtworkMutation(\n  $input: MyCollectionCreateArtworkInput!\n) {\n  myCollectionCreateArtwork(input: $input) {\n    artworkOrError {\n      __typename\n      ... on MyCollectionArtworkMutationSuccess {\n        artworkEdge {\n          node {\n            internalID\n            images(includeAll: true) {\n              internalID\n            }\n            id\n          }\n        }\n      }\n      ... on MyCollectionArtworkMutationFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "edecaa95250d642f6187d43e0f800812";

export default node;
