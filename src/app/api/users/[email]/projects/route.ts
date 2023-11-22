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

    const projects = await prisma.Project.findMany({
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

export const PATCH = async(req, { params }) => {
  const { projectData } = await req.json();

  try {
    const updateProject = await prisma.Project.update({
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

export const POST = async(req, res) => {
  const { projectData } = await req.json();
    
  try {
    const newProject = await prisma.Project.create({
      data: projectData
    });

    return new Response(JSON.stringify(newProject), { status: 201 })

  } catch (err) {
    console.log('create err: ', err)
    return new Response('Failed to create a new project', { status: 500 })
  }
}