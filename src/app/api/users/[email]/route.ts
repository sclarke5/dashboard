// @ts-nocheck
import prisma from "@/app/lib/prisma";

export const GET = async(req, { params }) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
        email: params.email
      }
    })

    if(!user){
      return new Response('User not found', { status: 404 })
    }

    return new Response(JSON.stringify(user), { status: 200 })
  } catch(err) {
    console.log('err')
    return new Response('Failed to fetch user', { status: 500 })
  }
}

export const PATCH = async(req, { params }) => {
  const { fullName } = await req.json();

  try {
    const updateUser = await prisma.user.update({
      where: {
        email: params.email
      },
      data: {
        name: fullName,
      }
    })
  
    if(!updateUser){
      return new Response('User not found', { status: 404 })
    }
  
    return new Response(JSON.stringify(updateUser), { status: 200 })

  } catch(err) {
    console.log('server route err: ', err);
    return new Response('Failed to update user', { status: 500 })
  }



}