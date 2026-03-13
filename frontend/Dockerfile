# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.22.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

# เปลี่ยนเป็น Development เพื่อให้ติดตั้งแพ็กเกจครบถ้วน
ENV NODE_ENV development

# ลบ --omit=dev ออก เพื่อให้ติดตั้งเครื่องมืออย่าง vite หรือ react-scripts ด้วย
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci


# เพิ่ม --chown=node:node เพื่อป้องกันปัญหาเรื่องสิทธิ์การอ่านเขียนไฟล์
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]