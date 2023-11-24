import prisma from "@/app/lib/prisma"
import { NextApiResponse } from "next"

export const GET = async(req: Request, { params }: { params: { email: string } }) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(params.email)
      }
    })

    if(!user){
      return new Response('User not found', { status: 404 })
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: user.id
      }
    })

    return new Response(JSON.stringify(projects), { status: 200 })
  } catch(err) {
    console.log('err ', err)
    return new Response('Failed to fetch projects', { status: 500 })
  }
}

export const PATCH = async(req: Request, { params }: { params: { id: string } }) => {
  const { projectData } = await req.json();

  try {
    const updateProject = await prisma.project.update({
      where: {
        id: projectData.id
      },
      data: projectData
    })

  
    if(!updateProject){
      return new Response('Project not found', { status: 404 })
    }
  
    return new Response(JSON.stringify(updateProject), { status: 200 })

  } catch(err) {
    console.log('server route err: ', err);
    return new Response('Failed to update user', { status: 500 })
  }
}

export const POST = async(req: Request, res: NextApiResponse) => {
  const { projectData } = await req.json();
    
  try {
    const newProject = await prisma.project.create({
      data: projectData
    });

    return new Response(JSON.stringify(newProject), { status: 201 })

  } catch (err) {
    console.log('create err: ', err)
    return new Response('Failed to create a new project', { status: 500 })
  }
}