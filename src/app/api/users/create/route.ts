// @ts-nocheck

import prisma from "@/app/lib/prisma";

export const POST = async(req, res) => {
  const { name, email } = await req.json();
    
  try {
    const newUser = await prisma.User.create({
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
