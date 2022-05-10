import React, { FC } from "react";
import { FamilyNode } from "../types/models";
import { FaUserFriends } from "react-icons/fa";

type TreeNodeProps = {
  nodeData: FamilyNode;
};

const TreeNode: FC<TreeNodeProps> = ({ nodeData }) => {
  return (
    <ul style={{ borderLeft: "1px solid black", width: 200 }}>
      <div
        style={{
          padding: 5,
          marginBottom: 10,
          border: "1px dashed black",
        }}
      >
        {nodeData.data?.map((i) => (
          <div
            key={`node-${i.id}`}
            style={{
              backgroundColor: `${
                i.gender === "male" ? `lightblue` : `lightpink`
              }`,
              display: "flex",
              margin: 5,
              padding: 10,
              alignItems: "center",
            }}
          >
            <FaUserFriends style={{ marginRight: 10 }} />
            {i.name}
          </div>
        ))}
      </div>

      {nodeData.children.map((i, idx) => (
        <TreeNode key={`treenode-${idx}`} nodeData={i} />
      ))}
    </ul>
  );
};

export default TreeNode;
