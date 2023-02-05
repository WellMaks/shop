import withAuth from "../components/WithAuth";
import { prisma } from "../components/prisma";

function adminPage(props: { products: any }) {
  const products = props.products === null ? false : true;
  return (
    <>
      <h2 className="text-4xl font-bold dark:text-white text-center">
        Admin Panel
      </h2>
      <br></br>
      {products && props.products ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Command Id
                </th>
                <th scope="col" className="px-6 py-3">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {props.products.map((product: any) => (
                <tr
                  key={product.command_id}
                  className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product.command_id}
                  </th>
                  <td className="px-6 py-4">{product.user_id}</td>
                  <td className="px-6 py-4">{product.product.name}</td>
                  <td className="px-6 py-4">{product.product.price}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No products to show</div>
      )}
    </>
  );
}

export default withAuth(adminPage);

export async function getServerSideProps() {
  const result = await prisma.commands.findMany();
  return {
    props: {
      products: result.length != 0 ? result : null,
    },
  };
}
