export interface NodeData {
  id: number;
  name: string;
  children: number[];
  gender: string;
  parents: number[];
}

export class FamilyNode {
  data: NodeData[] | undefined;
  children: FamilyNode[];

  constructor(data: NodeData[] | undefined, children: FamilyNode[]) {
    this.data = data;
    this.children = children;
  }
}
