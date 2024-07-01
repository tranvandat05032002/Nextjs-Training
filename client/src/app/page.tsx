import ButtonLogout from "@/components/button-logout";
import { Table, TableCaption, TableRow, TableCell, TableHead, TableHeader, TableBody } from "@/components/ui/table"
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
const isAuth = false;
export default function Home() {
  if (!isAuth) {
    redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <h1 className="font-sans font-thin text-red-500">Thin</h1>
      <h2 className="font-sans font-light text-blue-500">Light</h2>
      <h3 className="font-sans font-medium text-pink-500">Medium</h3>
      <p className="font-sans font-bold text-green-500">Bold</p>

      <Image
        src={"/heart_image.jpeg"}
        alt="heart"
        width={500}
        height={500}
        quality={100}
      />

      <ul>
        <li>
          <Link href={"/register"}>Register</Link>
        </li>
        <li>
          <Link href={"/login"}>Login</Link>
        </li>
      </ul>
    </main >
  );
}
