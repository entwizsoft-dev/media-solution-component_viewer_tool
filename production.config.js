module.exports = {
    apps: [
      {
        name: "xexex-admin",
        script: "node_modules/next/dist/bin/next",
        args: "start",
        cwd: "./",
        watch: true,
        env: {
          //배포 환경설정
          NODE_ENV: "production",
          PORT:3003
        },
        instances: 2,
        exec_mode: "cluster",
      },
    ],
  };
  