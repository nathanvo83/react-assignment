import React, { useCallback, useEffect, useState } from "react";
import TreeNode from "./components/TreeNode";
import { NodeData, FamilyNode } from "./types/models";

const familyTree: NodeData[] = [
  {
    id: 2351232112252,
    name: "Sally",
    children: [5555, 6666, 7777, 8458189966444, 897543276547654765443576],
    gender: "female",
    parents: [],
  },
  {
    id: 1231239887112,
    name: "Billy",
    children: [8458189966444, 5555, 6666, 7777, 897543276547654765443576],
    gender: "male",
    parents: [],
  },
  {
    id: 7777,
    name: "Suzie",
    gender: "female",
    children: [317849882, 8569047194214199353],
    parents: [2351232112252, 1231239887112],
  },
  {
    id: 23123122,
    name: "Sam",
    gender: "male",
    children: [317849882, 8569047194214199353],
    parents: [],
  },
  {
    id: 317849882,
    name: "Josh",
    gender: "male",
    children: [43924235082592],
    parents: [7777, 23123122],
  },
  {
    id: 8593288989,
    name: "Sarah",
    gender: "female",
    children: [43924235082592],
    parents: [],
  },
  {
    id: 43924235082592,
    name: "Jim",
    gender: "male",
    children: [9305009999, 88888888],
    parents: [317849882, 8593288989],
  },
  {
    id: 83473298328562398696,
    name: "Clara",
    gender: "female",
    children: [9305009999, 88888888],
    parents: [],
  },
  {
    id: 9305009999,
    name: "Joe",
    children: [],
    gender: "male",
    parents: [43924235082592, 83473298328562398696],
  },
  {
    id: 8569047194214199353,
    name: "Charlie",
    gender: "male",
    children: [565893648394894339808, 89898989],
    parents: [23123122, 7777],
  },
  {
    id: 4382743284732483290,
    name: "Jessie",
    gender: "female",
    children: [565893648394894339808, 89898989],
    parents: [],
  },
  {
    id: 565893648394894339808,
    name: "Bob",
    gender: "male",
    children: [],
    parents: [8569047194214199353, 4382743284732483290],
  },
  // {
  //   id: 89898989,
  //   name: "XYZ",
  //   gender: "male",
  //   children: [],
  //   parents: [8569047194214199353, 4382743284732483290],
  // },
  {
    id: 8458189966444,
    name: "Ricky",
    gender: "male",
    children: [],
    parents: [2351232112252, 1231239887112],
  },
  {
    id: 897543276547654765443576,
    name: "Julian",
    gender: "male",
    children: [],
    parents: [1231239887112, 2351232112252],
  },
];

const App = () => {
  const [treeList, setTreeList] = useState<FamilyNode>();

  const equals = (x: number[], y: number[]): boolean => {
    return (
      x.length === y.length &&
      x.sort().every((value, idx) => value === y.sort()[idx])
    );
  };

  const getNodeById = (data: NodeData[], id: number): NodeData => {
    return data.filter((node: NodeData) => node.id === id)[0];
  };

  const getParentsOfChildren = useCallback(
    (data: NodeData[], children: number[]): NodeData[] => {
      return data.filter((node: NodeData) => equals(node.children, children));
    },
    []
  );

  const createFamilyNode = useCallback(
    (data: NodeData[], node?: NodeData): FamilyNode => {
      let result: FamilyNode = new FamilyNode(undefined, []);

      if (!node) {
        // root
        result.data = data.filter((node) => (node.parents = [])).slice(0, 2);

        // filter -> remove fake node
        result.data[0].children
          .map((i) => getNodeById(data, i))
          .filter((i) => i)
          .map((i) => result.children.push(createFamilyNode(data, i)));
      } else {
        // sub node
        if (node.children.length > 0) {
          result.data = getParentsOfChildren(data, node.children);

          // filter -> remove fake node
          result.data[0].children
            .map((i) => getNodeById(data, i))
            .filter((i) => i)
            .map((i) => result.children.push(createFamilyNode(data, i)));
        } else {
          result.data = [node];
        }
      }

      return result;
    },
    [getParentsOfChildren]
  );

  useEffect(() => {
    const x = createFamilyNode(familyTree);
    setTreeList(x);
  }, [createFamilyNode]);

  return <div>{treeList && <TreeNode nodeData={treeList} />}</div>;
};

export default App;
