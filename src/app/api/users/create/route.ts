import prisma from "@/app/lib/prisma";
import { NextApiResponse } from "next";

export const POST = async(req: Request, res: NextApiResponse) => {
  const { name, email } = await req.json();
    
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

  return new Response(JSON.stringify(newUser), { status: 201 })
  } catch (err) {
    return new Response('Failed to create a new prompt', { status: 500 })
  }
}
