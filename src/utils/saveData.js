export const saveData = (name, sector, _id) => {
   window.localStorage.setItem("name", name);
   window.localStorage.setItem("sector", sector);
   window.localStorage.setItem("_id", _id);
};

export const getData = () => {
   const name = window.localStorage.getItem("name");
   const sector = window.localStorage.getItem("sector");
   const _id = window.localStorage.getItem("_id");

   if (name && sector && _id) return { name, sector, _id };
   return false;
};
