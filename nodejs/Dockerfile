FROM node:16

WORKDIR /usr/src/app

# ENV FIREFOX_VER 103.0
# ENV GECKODRIVER_VER 0.31.0

# # Add latest FireFox
# RUN curl -sSLO https://download-installer.cdn.mozilla.net/pub/firefox/releases/${FIREFOX_VER}/linux-x86_64/en-US/firefox-${FIREFOX_VER}.tar.bz2 \
#    && tar -jxf firefox-* \
#    && mv firefox /opt/ \
#    && chmod 755 /opt/firefox \
#    && chmod 755 /opt/firefox/firefox


# # Add geckodriver
# RUN curl -sSLO https://github.com/mozilla/geckodriver/releases/download/v${GECKODRIVER_VER}/geckodriver-v${GECKODRIVER_VER}-linux64.tar.gz \
#    && tar zxf geckodriver-*.tar.gz \
#    && mv geckodriver /usr/local/bin


RUN npm install --location=global npm@8.15.1

CMD "npm" "install" ; npm run dev
# # node index.js
EXPOSE 3331
