import { Table, TableCaption, TableRow, TableCell, TableHead, TableHeader, TableBody } from "@/components/ui/table"
import Image from "next/image";
export default function Home() {
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
      <Image
        src={"https://images.pexels.com/photos/19345473/pexels-photo-19345473/free-photo-of-statue-in-roof-corner.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
        width={500}
        height={500}
        alt="External image"
        quality={100}
      />
    </main >
  );
}
