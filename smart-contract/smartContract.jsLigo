type id = string;

type user_details = {
  address: address,
  uid: string,
  pid: string
};
type p_details ={
  productID: string,
  percentageUsed: string
};

type p_map = big_map<id, p_details>; // for partsComposition, details and subparts

type product_details_inputs = {
  id: string,
  name: string,
  user_id: string,
  pid: string,
  owner: string,
  category: string,
  model: string,
  manufactureIn: string,
  createdIn: string,
  description: string,
  action: string,
};
type product_details = {
  id: string,
  name: string,
  user_id: string,
  pid: string,
  owner: string,
  claimRequest: string,
  category: string,
  model: string,
  manufactureIn: string,
  createdIn: string,
  description: string,
  action: string,
  parentID: string,
  // add three new fields
  partComposition: list<string>,
  subParts: list<string>,
  // part_details: big_map<id, p_details>,
};

type transfer = {
  id: string,
  new_owner: option<string>
};
type product_details_map = big_map<id, product_details>;

type storage = {
  users: big_map<id, user_details>,
  list: big_map<id, p_details>,
  products: big_map<id, product_details>
};

type action =
| ["Create_product", product_details_inputs]
| ["Update_product", product_details]
| ["Get_details"];

let create_product = ([parameter, storage]: [product_details_inputs, storage]) : storage => {
    let temp: list<string> = list([]);
    let id = parameter.id;
    let products = storage.products;
    let create_product_obj = {
      id: parameter.id,
      name: parameter.name,
      user_id: parameter.user_id,
      pid: parameter.pid,
      owner: parameter.owner,
      claimRequest: "",
      category: parameter.category,
      model: parameter.model,
      manufactureIn: parameter.manufactureIn,
      createdIn: parameter.createdIn,
      description: parameter.description,
      action: "Created object successfully",
      parentID: "",
      partComposition: temp,
      subParts: temp,
      // part_details: Big_map.empty,
    };
    let updated_products = Big_map.update(id, Some(create_product_obj), products);
      return  {
                users: storage.users,
                list : storage.list,
                products : updated_products,
              };
};

let update_product = ([parameter, storage]: [product_details, storage]) : storage => {
  let id = parameter.id;
  let products = storage.products;

  let updated_id_details: product_details = {
    id: id,
    name: parameter.name,
    user_id: parameter.user_id,
    pid: parameter.pid,
    owner: parameter.owner,
    claimRequest: parameter.claimRequest,
    category: parameter.category,
    model: parameter.model,
    manufactureIn: parameter.manufactureIn,
    createdIn: parameter.createdIn,
    description: parameter.description,
    action: parameter.action,
    parentID: parameter.parentID,
    // add three new fields
    partComposition: parameter.partComposition,
    subParts: parameter.subParts
  };
  let updated_products = Big_map.update(id, Some(updated_id_details), products);
  return    {
                users: storage.users,
                list : storage.list,
                products : updated_products
            };
};

let get_details = (store :storage) : storage => store ;


let main = ([action, store  ]: [action, storage]) : [list<operation>, storage] => {
   return [(list([]) as list<operation>), match(action, {
                                                       Get_details : () => get_details(store),
                                                       Create_product: cd => create_product([cd, store]),
                                                       Update_product: ud => update_product([ud, store])
                                                       })
    ];
};  