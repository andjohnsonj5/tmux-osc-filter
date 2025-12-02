# tmux 源码编译与运行说明（Debian 13 示例）

## 1. 构建依赖

```bash
DEBIAN_FRONTEND=noninteractive apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y \
  autoconf automake libtool pkg-config \
  libevent-dev libncurses-dev bison
```

说明：
- `libevent-dev`、`libncurses-dev` 提供 tmux 所需的事件与终端能力头文件/静态库。
- `autoconf`、`automake`、`libtool` 用于生成构建脚本。
- `bison` 供 `cmd-parse.y` 生成 C 代码。

## 2. 生成配置脚本

源码仓库未包含 `configure`，需先运行：

```bash
./autogen.sh
```

## 3. 配置

```bash
./configure
```

可选参数：
- 默认前缀 `/usr/local`，如需自定义可加 `--prefix=/opt/tmux`.

## 4. 编译

```bash
make -j"$(nproc)"
```

编译产物：
- 可执行文件：`tmux`
- 手册页：`tmux.1`（如需安装可 `make install`）

## 5. 运行时依赖（动态库）

在 Debian 13 上通过 `ldd tmux` 得到：

- `libtinfo.so.6` （来自 ncurses）
- `libevent_core-2.1.so.7` （libevent）
- `libm.so.6`
- `libresolv.so.2`
- `libc.so.6`
- `ld-linux-x86-64.so.2`

若目标机器缺失上述库，请安装对应运行时包（通常为 `libevent-2.1-7`、`libncurses6` 等）。

```bash
apt update && apt install -y libevent-core-2.1-7t64 libtinfo6
```

## 6. 快速验证

```bash
./tmux -V   # 查看版本
./tmux new -s test
```

## 7. 清理

```bash
make clean
```
