//@ts-nocheck

import prisma from "@/app/lib/prisma"

export const GET = async(req, { params }) => {
  try {
    const user = await prisma.User.findUnique({
      where: {
        id: parseInt(params.email)
      }
    })

    if(!user){
      return new Response('User not found', { status: 404 })
    }

    const project = await prisma.Project.findFirst({
      where: {
        userId: user.id
      }
    })



    return new Response(JSON.stringify(project), { status: 200 })
  } catch(err) {
    console.log('err ', err)
    return new Response('Failed to fetch user', { status: 500 })
  }
}