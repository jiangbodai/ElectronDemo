<template>
  <div class="login">
    <div class="left">
      <img src="../assets/images/login/login.png" />
    </div>
    <div class="right">
      <a-button
        class="setting"
        @click="systemSetting"
        shape="circle"
        icon="setting"
      />
      <div class="logo_head">
        <img src="../assets/images/login/logohead.jpg" />
        <div class="title">
          <div class="zh">扁鹊飞救医疗信息化综合平台</div>
          <div class="en">Healthcare Information Technology</div>
        </div>
      </div>
      <a-form
        id="components-form-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <p>
          <span class="label-zh">用户名</span> /
          <span class="label-en">USERNAME</span>
        </p>
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              {
                rules: [{ required: true, message: '请输入用户名!' }],
              },
            ]"
            placeholder="用户名"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="user"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <p>
          <span class="label-zh">密码</span> /
          <span class="label-en">PASSWORD</span>
        </p>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [{ required: true, message: '请输入密码!' }],
              },
            ]"
            type="password"
            placeholder="密码"
            size="large"
          >
            <a-icon
              slot="prefix"
              type="lock"
              style="color: rgba(0, 0, 0, 0.25)"
            />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              },
            ]"
          >
            记住用户名
          </a-checkbox>
          <a-button
            type="primary"
            html-type="submit"
            class="login-form-button"
            size="large"
          >
            登 录
          </a-button>
        </a-form-item>
      </a-form>
      <div class="bottom">
        <span>©飞救医疗科技（北京）有限公司</span>
      </div>
    </div>
    <div>
      <a-modal v-model="visible" title="系统配置" on-ok="handleOk">
        <template slot="footer">
          <a-button key="submit" type="primary"> 保存 </a-button>
        </template>
        <a-form :form="form">
          <a-form-item
            label="API_URL"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="[
                'API_URL',
                { rules: [{ required: true, message: '请输入接口地址' }] },
              ]"
              placeholder="接口地址"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="SignalR_URL"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="[
                'SignalR_URL',
                {
                  rules: [
                    { required: true, message: '请输入消息和心电监护接口地址' },
                  ],
                },
              ]"
              placeholder="消息和心电监护接口地址"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="前置机接口"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input
              v-decorator="['Front_URL']"
              placeholder="前置机接口地址"
            ></a-input>
          </a-form-item>
          <a-form-item
            label="锁屏时间"
            :label-col="{ span: 8 }"
            :wrapper-col="{ span: 16 }"
          >
            <a-input-number
              v-decorator="[
                'screenLockTime',
                { rules: [{ required: true, message: '请输入锁屏时间' }] },
              ]"
              :min="1"
              :max="1000"
              :precision="0"
              :formatter="(value) => `${value}分钟`"
              :parser="(value) => value.replace('分钟', '')"
              :maxLength="4"
              style="width: 100%"
              placeholder="锁屏时间"
            ></a-input-number>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      form: this.$form.createForm(this, { name: "login" }),
      visible: false,
    };
  },
  beforeCreate() {},
  methods: {
    systemSetting: function () {
      this.visible = !this.visible;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          localStorage.setItem("login", true);
          console.log("登录");
          this.$electron.ipcRenderer.send("login");
        }
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
.login {
  display: flex;
  justify-content: space-around;

  div {
    flex: none;
  }

  .left {
    width: 40vw;
    height: 100vh;
    text-align: center;

    img {
      height: 70vh;
      margin: 15vh 0 0 0;
    }
  }

  .right {
    width: 60vw;
    height: 100vh;
    margin-right: 80px;

    .setting {
      display: absolute;
      float: right;
      top: 10px;
    }

    .logo_head {
      margin-top: 120px;
      margin-bottom: 50px;
      display: flex;
      flex-direction: row;

      .zh {
        height: 46px;
        line-height: 46px;
        font-size: 32px;
      }

      .en {
        height: 20px;
        line-height: 20px;
        font-size: 16px;
      }
    }

    .login-form {
      margin-top: 30px;

      .login-form-forgot {
        float: right;
      }

      .login-form-button {
        width: 100%;
      }
    }

    .bottom {
      text-align: center;
      font-size: 17px;
      margin: 10px auto;
    }
  }
}
</style>
