export type User = {
    userId?: string; 
    fullName?: string;
    ritwickName?: string;
    swastyayani?: string;
    istavrity?: string;
    acharyavrity?: string;
    dakshina?: string;
    sangathani?: string;
    ritwicki?: string;
    proname?: string;
    anandabazar?: string;
    srimandir?: string;
    parivrity?: string;
    misc?: string;
    address?: string;
    total?:number;
  };

  export type FamilyObject = {
    users: User[];
    familyCode: string;
  };