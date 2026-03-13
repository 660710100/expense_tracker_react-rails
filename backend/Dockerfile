# syntax=docker/dockerfile:1

ARG RUBY_VERSION=3.4.8
FROM docker.io/library/ruby:$RUBY_VERSION-slim

WORKDIR /rails

# ติดตั้งเครื่องมือช่างและแพ็กเกจพื้นฐานที่จำเป็นสำหรับการรันและลง Gems ใหม่
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    git \
    libyaml-dev \
    pkg-config \
    curl \
    libjemalloc2 && \
    ln -s /usr/lib/$(uname -m)-linux-gnu/libjemalloc.so.2 /usr/local/lib/libjemalloc.so && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# ตั้งค่าโหมด Development (ลบการจำกัดแบบ Production ออกให้หมด)
ENV RAILS_ENV="development" \
    BUNDLE_PATH="/usr/local/bundle" \
    LD_PRELOAD="/usr/local/lib/libjemalloc.so"

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

EXPOSE 3001

ENTRYPOINT ["/rails/bin/docker-entrypoint"]

# สั่งรันเซิร์ฟเวอร์แบบธรรมดา ไม่ต้องผ่าน Thruster 
# (-b 0.0.0.0 คืออนุญาตให้ภายนอกตู้เข้ามาเชื่อมต่อได้)
CMD ["./bin/rails", "server", "-b", "0.0.0.0", "-p", "3001"]