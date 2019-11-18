<template>
  <div class="container">
    <div class="clearfix"></div>
    <group label-width="4.4em" label-margin-right=".8em" title="请填写身份信息">
      <hide-input v-model="userPhone" title="手机号码" placeholder="请输入手机号码" type="phone" title-align="right"></hide-input>
      <hide-input v-model="userName" title="真实姓名" placeholder="请输入真实姓名" type="name" :showTopLine="false" title-align="right"></hide-input>
      <hide-input v-model="userIdCard" title="身份证号" placeholder="请输入身份证号" type="idCard" title-align="right"></hide-input>
    </group>
    <group label-width="4.4em" label-margin-right=".8em" title="请填写登录密码">
      <x-input title="登录密码" type="password" placeholder="请输入登录密码" v-model="userPwd"></x-input>
      <x-input title="再输一次" type="password" placeholder="请输入再输一次登录密码" v-model="userPwdAgain"></x-input>
      <x-input title="验证码" v-model="verificationCode" :max="6" class="verification-code" placeholder="请输入图形验证码" :show-clear="false">
        <img slot="right" :src="verificationCodeImg" @click="BLL.loadVerifyCodeImg()" />
      </x-input>
    </group>
    <div class="btn-div">
      <x-button type="comm" @click.native="next" :disabled="disabled">确认无误</x-button>
      <div style="font-size:14px;text-align:center;margin-top:10px;" @click="showDialog=true">点击以上按钮即您已同意
        <span style="color:#2891f7;">《诚友信服务协议》</span>
      </div>
    </div>
    <div class="box-bottom">PRESENTED BY LI.R&D TEAM 2018-2020.</div>
    <i-scroll-dialog v-model="showDialog">
      <h3 slot="scrollTitle">
        诚友信服务协议
      </h3>
      <div slot="default" style="padding:10px;">
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            感谢你选择诚友信服务。诚友信服务协议（以下简称本协议）由西安崇越信息科技有限公司 (以下简称崇越科技)和你签订。
        </p>
        <p style="text-align:left;">
            一、注册信息和隐私保护
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            1、 <span style="font-size:17px">诚友信</span>帐号（即诚友信用户<span style="font-size:19px">ID</span> )的所有权归诚友信，用户按注册页面引导填写信息，阅读 并同意本协议且完成全部注册程序后，即可获得诚友信帐号并成为诚友信用户。用户应提供及 时、详尽及准确的个人资料，并不断更新注册资料，符合及时、详尽及准确的要求。所有原始键 入的资料将引用为注册资料。如果因注册信息不真实或更新不及时而引发的相关问题，诚友信不 负任何责任。你可以通过诚友信帐号设置页面查询、更正你的信息，用户应当通过真实身份信息 认证注册帐号，且用户提交的帐号名称、头像和简介等注册信息中不得出现违法和不良信息，经 诚友信审核，如存在上述情况，诚友信将不予注册；同时，在注册后，如发现用户以虚假信息骗 取帐号名称注册，或其帐号头像、简介等注册信息存在违法和不良信息的，诚友信有权不经通知 单方采取限期改正、暂停使用、注销登记、收回等措施。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            2、 诚友信帐号包括帐户名称，你可使用设置的帐户名称（包括用户名、手机号、邮箱）；在 帐号使用过程中，为了保障你的帐号安全基于不同的终端以及你的使用习惯，我们可能采取不同 的验证措施识别你的身份。例如你的帐户在新设备首次登录，我们可能通过校验码的方式识别你 的身份，齡肪式包括但不限书豆信齡正码、服务使用信息齡正。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            3、 用户不应将其帐号、出售或出借予他人使用，若用户授权他人使用帐户，应对被授权人在 该帐户下发生所有行为负全部责任。由于帐号关联用户使用信息，仅当依法律法规、司法裁定或 经诚友信同意，并符合诚友信规定的用户帐号转让流程的情况下，方可进行帐号的转让。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            4、 因你个人原因导致的帐号信息遗失，如需找回诚友信帐号信息<sub>f</sub>请按照诚友信帐号找回要 求提供相应的信息，并确保提供的信息合法真实有效，若提供的信息不符合要求，无法通过诚友信 证安全验证，诚友信有权拒绝提供帐号找回服务；若帐号的唯一凭证不再有效，诚友信有权拒绝
        </p>
        <p>
            支持帐号找回。例如手机号二次出售，诚友信可拒绝支持帮助找回原手机号绑定的帐号。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            5、 为了防止资源占用，如你连续六个月未使用你的诚友信帐号或未通过诚友信认可的其他方 式登录过你的诚友信帐户，诚友信有权对该帐户进行注销，你将不能再通过该帐号登录名登录本 网站或使用相关服务。如该帐户有关联的理财产品、待处理交易或余额，诚友信会在合理范围内 协助你处理，请你按照诚友信提示的方式进行操作。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            6、 当你使用诚友信产品进行登录等操作的时候，服务器会自动接收、验证、并记录一些必要 的信息，如手机号码、IP地址、Cookie、服务访问异常信息、以及部分设备信息等，以保障你在 使用诚友信服务时账户登录和支付过程的安全，进而保护你的上网安全。你使用诚友信的服务， 即表示你同意诚友信可以按照相关的隐私权政策处理你的个人信息。诚友信可能会与合作伙伴共 同向你提供你所要求的服务或者共同向你展示你可能感兴趣的内容。在信息为该项产品/服务所必 须的情况下，你同意诚友信可与其分享必要的信息。并且，诚友信会要求其确保数据安全并且禁 止用于可其他用途。除此之外，诚友信不会向可无关第三方提供或分享信息。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            7、 你知悉并授权，诚友信及查询服务在提供技术服务期间，自行或通过第三方权威 机构向包含但不限于中国人民银行征信中心及其分支机构、以及其他信息服务机构查询并获取本 人的个人信息（包括但不限于身份信息、联系方式、工作信息、银行卡交易信息、银行贷款相关 信息、网络交易信息、逾期信息及其他信息等），以了解本人资信状况。你已经充分理解并知晓 该等信息被提供和使用的风险，包括但不限于：上述信息对你的信用评价、以及分析报告等结果 产生不利影响的风险等。你同意并授权查询服务提供机构可留存、整理、加工、使用本次获取的 你信息用于查询服务提供机构为你提供的其他服务中。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            8、 你知悉并授权，诚友信及查询服务提供机构在业务存续期间向国家设立的金融信用信息基 础数据库及第三方征信机构查询和使用本人信用报告，•并同意诚友信将包括本人的身份信息、贷 款信息、不良信息等个人信息报送至金融信用信息基础数据库及第三方征信机构。无论本授权涉 及业务是否获得批准，均有保留本授权书及本人信用报告等相关资料的权利。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            9、 为更好地向用户提供服务，你同意诚友信通过短信等形式向你发送相关商业性M务信息。
        </p>
        <p>
            二、使用规则
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            1、 用户在使用诚友信服务时，必须遵守《网络安全法》、《互联网新闻信息服务管理规定》 等中华人民共和国相关法律法规的规定，用户应同意将不会利用本服务进行任何违法或不正当的 活动，包括但不限于下列行为：
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            a、 上载、展示、张贴、传播或以其它方式传送含有下列内容之_的信息：
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            反对宪法所确定的基本原则的；
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            损害国家荣誉和利益的；
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            煽动民族仇恨、民族歧视、破坏民族团结的；
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            破坏国家宗教政策，宣扬邪教和封建迷信的,•
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            <span style="font-size:19px">散布谣言，扰乱社,破坏社会稳定的；</span>
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            散布淫移、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的,•
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            侮辱或者俳谤他人，侵害他人合法权利的；
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            b、 不得为任何非法目的而使用网络服务系统；
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            c、 不利用诚友信服务从事以下活动：
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            未经允许，进入计算机信息网络或者使用计算机信息网络资源的；
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            未经允许，对计算机信息网络功能进行删除、修改或者增加的,•
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修 改或者增加的；
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            故意制作、传播计算机病毒等破坏性程序的,•
        </p>
        <p style="margin-left:68px;text-align:left;text-justify: inter-ideograph">
            其他危害计算机信息网络安全的行为。
        </p>
        <p style="text-indent:40px">
            2、 用户违反本协议或相关的服务条款的规定，导致或产生的任何第三方主张的可索赔、要 求或损失，包括合理的律师费，你同意赔偿诚友信与合作公司、关联公司，并使之免受损害。对 此，诚友信有权视用户的行为性质，采取包括但不限于删除用户发布信息内容、暂停使用许可、 终止服务、限制使用、回收诚友信帐号、追究法律责任等措施。对恶意注册诚友信帐号或利用有
        </p>
        <p style="text-align:left;text-justify:inter-ideograph">
            凭证帐号进行违法活动、捣乱、骚扰、欺骗、其他用户以及其他违反本协议的行为，诚友信有权 回收其帐号。同时，诚友信公司会视司法部门的要求，协助调查。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            3、 用户不得对本服务可部分或本服务之使用^得，进行复制、拷贝、出售、转售或用于 任何其它商业目的。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            4、 用户不得对本服务可部分或本服务之使用^得，进行复制、拷贝、出售、转售或用于 任何其它商业目的用户须对自己在使用诚友信服务过程中的行为承担法律责任。用户承担法律责 任的形式包括但不限于：对受到侵害者进行赔偿，以及在诚友信公司首先承担了因用户行为导致 的行政处罚或侵权损害赔偿责任后，用户应给予诚友信公司等额的赔偿。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            5、 用户在使用诚友信时遵守以下互联网底线：
        </p>
        <p style="margin-left:60px;text-align:left;text-justify: inter-ideograph">
            <span style="font-size:21px">a</span>、 法衛規底线
        </p>
        <p style="margin-left:60px;text-align:left;text-justify: inter-ideograph">
            <span style="font-size:21px">b</span>、 社会主义制度底线
        </p>
        <p style="margin-left:60px;text-align:left;text-justify: inter-ideograph">
            <span style="font-size:21px">c</span>、 国家利益底线
        </p>
        <p style="margin-left:60px;text-align:left;text-justify: inter-ideograph">
            <span style="font-size:21px">d</span>、 公民合法权益底线
        </p>
        <p style="margin-left:60px;text-align:left;text-justify: inter-ideograph">
            <span style="font-size:21px">e</span>、 社会公共秩序底线
        </p>
        <p style="margin-left:60px;text-align:left;text-justify: inter-ideograph">
            <span style="font-size:21px">f</span>、 道德风尚底线
        </p>
        <p style="margin-top:0;margin-right:0;margin-bottom:12px;margin-left:60px;text-align:left;text-justify:inter-ideograph">
            <span style="font-size:21px">g</span>、 信息真实性底线
        </p>
        <p style="text-align:left;text-justify:inter-ideograph">
            三、不可抗力、免责及责任限制
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            因下列原因导致诚友信无法正常提供服务，诚友信不承担责任：
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            1、 诚友信系统停机维护或升级；
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            2、 因台风地震、洪水、雷电或恐怖袭击等不可抗力原因,•
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            3、 用户的电脑软硬件和通信线路、供电线路出现故障的；
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            4、 用户操作不当或通过非诚友信授权或认可的方式使用诚友信业务的；
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            5、 因病毒、木马、恶意程序攻击、网络拥堵、系统不稳定、系统或设备故障&#39;通讯故障&#39;电 力故障&#39;银行原因、第三方服务瑕疵或政府行为等原因；
        </p>
        <p style="margin-bottom:13px;text-align:left;text-justify: inter-ideograph;text-indent:40px;line-height:19px">
            尽管有前款约定，诚友信将采取合理行动积极促使服务恢复正常。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;line-height:32px">
            四、 <span style="font-size:19px">知权和其他合法权益</span>
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px;line-height:32px">
            1、 诚友信及关联公司所有系统及本网站上所有内容，包括但不限于著作、图片、档案、资 讯、资料、网站架构、网站画面的安排、网页设计，均由诚友信或诚友信关联公司依法拥有其知 <span style="font-size:21px">iP</span>权，包括但不限于商标权、著作权，商业秘密等。
        </p>
        <p style="text-indent:40px;line-height:32px">
            2、 非经诚友信或诚友信关联公司书面同意，可人不得擅自使用、修改、反向编译&#39; 复制、 公开传播、改变、散布、发行或公开发表本网站程序或内容。
        </p>
        <p style="margin-bottom:12px;text-align:left;text-justify: inter-ideograph;text-indent:40px;line-height:32px">
            3、 尊重知<span style="font-size:21px">i</span>只产权是你应尽的义务，如有违反，你应承担损害赔偿责任。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph">
            五、 青少年用户特别提示
        </p>
        <p style="margin-bottom:12px;text-align:left;text-justify: inter-ideograph;text-indent:40px">
            要善于网上学习，不浏览不良信息；要诚实友好交流，不侮辱欺诈他人，要增强自护意识， 不随意约会网友；要维护网络安全，不破坏网络秩序；要有益身心健康，不沉溺虚拟时空。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph">
            六、 其他
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            1、 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            2、 如双方就本协议内容或其执行发生可争议，双方应尽量友好协商解决；协商不成时，任 何一方均可向崇越科技所在地人民法院提起诉讼。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            3、 崇越科技未行使或执行本服务协议可权利或规定，不构成对前述权利或权利之放弃。
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            4、 如本协议中的可条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条 款仍应有效并且有约束力。
        </p>
        <p style="margin-bottom:35px;text-align:left;text-justify: inter-ideograph;text-indent:40px">
            5、 欢迎你使用诚友信旗下各专门频道或平台服务（以下称&quot;单项服务&quot;），并在本协议基础 上，同时遵守单项服务协议的具体约定。
        </p>
        <p style="text-align:right;line-height:19px">
            西安崇越信息科技有限公司•诚友信产品部
        </p>
        <p style="text-align:left;text-justify:inter-ideograph;text-indent:40px">
            &nbsp;
        </p>
        <p>
            <br/>
        </p>
      </div>
    </i-scroll-dialog>
  </div>
</template>

<script>
  import BLL from './index'
  import {
    XInput, Group, XButton, Cell
  } from 'vux'
  import iScrollDialog from '../../components/iScrollDialog.vue'
  import hideInput from '../../components/iHideInput.vue'

  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      hideInput,
      iScrollDialog
    },
    data () {
      return {
        userName: '',
        userPhone: '',
        userIdCard: '',
        userPwd: '',
        userPwdAgain: '',
        showInput: false,
        verificationCode: '',
        verificationCodeImg: null,
        verificationCodeToken: '',
        showDialog: false
      }
    },
    created () {
      // 初始化
      this.BLL = new BLL(this)
      this.BLL.init()
      this.BLL.loadVerifyCodeImg()
    },
    computed: {
      errMsg () {
        if (!this.$utils.Validate.chkFormat(this.userPhone, 'phone')) {
          return '请输入正确的手机号'
        }
        if (!this.$utils.Validate.chkFormat(this.userName, 'chinaName')) {
          return '请输入正确的姓名'
        }
        if (!this.$utils.Validate.chkFormat(this.userIdCard, 'idcard')) {
          return '请输入正确的身份证号'
        }
        if (this.userPwd !== this.userPwdAgain) {
          return '两次密码输入不一致'
        }
        return null
      },
      disabled () {
        if (!this.userPhone || this.userPhone.length !== 11) {
          return true
        } else if (!this.userName || this.userName.length < 2) {
          return true
        } else if (!this.userIdCard || this.userIdCard.length !== 18) {
          return true
        } else if (!this.userPwd || this.userPwd.length < 1) {
          return true
        } else if (!this.userPwdAgain || this.userPwdAgain.length < 1) {
          return true
        } else if (!this.verificationCode || this.verificationCode.length < 1) {
          return true
        }
        return false
      }
    },
    methods: {
      next () {
        if (this.errMsg) {
          this.$vux.toast.show(this.errMsg)
          return
        }
        this.BLL.register({
          userName: this.userName,
          userPhone: this.userPhone,
          userRealName: this.userName,
          userIdCard: this.userIdCard,
          userPwd: this.userPwd,
          imgCode: this.verificationCode,
          imgCodeToken: this.verificationCodeToken
        })
      }
    },
    watch: {}
  }
</script>

<style lang="less" scoped>
  .container {
    background-color: #fff;
    height: 100%;
    .btn-div {
      padding: 35px 15px 0;
    }
    .box-bottom {
      z-index: 10;
      position: absolute;
      bottom: 10px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #777;
    }
  }
</style>
