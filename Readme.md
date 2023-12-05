# video-mobile-test

Insira a chave de API do pandas em PANDA_API_KEY no arquivo backend/functions/.env
Para rodar o backend, vá para diretório backend/functions execute o comando. 

```bash
  npm run serve
```

Capture a o ip e a URL do backend, parecido com isso, talvez precise de espelhadores de porta como Localtunnel ou Ngrok.

```bash
  http://127.0.0.1:5001/panda-video-teste/us-central1
```

Coloque a URL na variavel EXPO_PUBLIC_API_URL em mob/.env

Para rodar o app, vá para o diretório mob e rode o comando

```bash
  npm start
```