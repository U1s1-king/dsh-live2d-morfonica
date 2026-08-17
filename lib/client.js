window.__ModuleLoader__.load({
	id: "dsh-live2d-morfonica",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		//#region src/client/waifu/config.js
		function readStoredId(key) {
			const value = parseInt(localStorage.getItem(key), 10);
			return Number.isNaN(value) || value < 0 ? null : value;
		}
		let modelId = readStoredId("morfonica-modelId");
		let modelTexturesId = readStoredId("morfonica-modelTexturesId");
		let config = {};
		let messageArray = [];
		function getModelId() {
			if (modelId === null || modelId === void 0) resetModelState();
			return modelId;
		}
		function setModelId(newModelId) {
			modelId = newModelId;
			localStorage.setItem("morfonica-modelId", newModelId.toString());
		}
		function getModelTexturesId() {
			if (modelTexturesId === null || modelTexturesId === void 0) resetModelState();
			return modelTexturesId;
		}
		function setModelTexturesId(newModelTexturesId) {
			modelTexturesId = newModelTexturesId;
			localStorage.setItem("morfonica-modelTexturesId", newModelTexturesId.toString());
		}
		function resetModelState() {
			modelId = 0;
			modelTexturesId = 0;
			localStorage.setItem("morfonica-modelId", "0");
			localStorage.setItem("morfonica-modelTexturesId", "0");
		}
		function getConfig() {
			return config;
		}
		function setConfig(newConfig) {
			config = newConfig;
		}
		function getMessageArray() {
			return messageArray;
		}
		function updateMessageArray(result) {
			messageArray = result.message.default[getModelId()];
			result.seasons.forEach(({ date, text }) => {
				const now = /* @__PURE__ */ new Date(), nowMonth = now.getMonth() + 1, nowDate = now.getDate(), after = date.split("-")[0], afterMonth = parseInt(after.split("/")[0]), afterDate = parseInt(after.split("/")[1]), before = date.split("-")[1] || after, beforeMonth = parseInt(before.split("/")[0]), beforeDate = parseInt(before.split("/")[1]);
				const isCrossYear = afterMonth > beforeMonth;
				let isInRange = false;
				if (isCrossYear) isInRange = nowMonth > afterMonth || nowMonth === afterMonth && nowDate >= afterDate || nowMonth < beforeMonth || nowMonth === beforeMonth && nowDate <= beforeDate;
				else isInRange = (nowMonth > afterMonth || nowMonth === afterMonth && nowDate >= afterDate) && (nowMonth < beforeMonth || nowMonth === beforeMonth && nowDate <= beforeDate);
				if (isInRange) for (let t of text[getModelId()]) messageArray.push(t);
			});
			result.time.forEach(({ hour, text }) => {
				const now = /* @__PURE__ */ new Date(), after = hour.split("-")[0], before = hour.split("-")[1] || after;
				if (after <= now.getHours() && now.getHours() <= before) for (let t of text[getModelId()]) messageArray.push(t);
			});
		}
		//#endregion
		//#region src/client/waifu/utils.js
		function randomSelection(obj) {
			if (Array.isArray(obj)) return obj[Math.floor(Math.random() * obj.length)];
			else if (typeof obj === "number") return Math.floor(Math.random() * obj);
			else return obj;
		}
		//#endregion
		//#region src/client/waifu/message.js
		let messageTimer;
		function showMessage(model, text, timeout, priority) {
			if (!text) return;
			const storedPriority = parseInt(sessionStorage.getItem("morfonica-waifu-text"), 10);
			if (!Number.isNaN(storedPriority) && storedPriority > priority) return;
			if (messageTimer) {
				clearTimeout(messageTimer);
				messageTimer = null;
			}
			text = randomSelection(text);
			sessionStorage.setItem("morfonica-waifu-text", priority);
			const tips = document.getElementById("waifu-tips-morfonica");
			if (tips) {
				tips.innerHTML = text.text || "";
				tips.classList.add("waifu-tips-active");
			}
			messageTimer = setTimeout(() => {
				sessionStorage.removeItem("morfonica-waifu-text");
				if (tips) tips.classList.remove("waifu-tips-active");
			}, timeout);
			if (model && model.model) {
				if (text.motion) try {
					model.model.motion(text.motion);
				} catch (error) {}
				if (text.expression) try {
					model.model.expression(text.expression);
				} catch (error) {}
			}
		}
		/** 清理未完成的气泡定时器（插件卸载 / HMR 重建时调用，防止残留 setTimeout）。 */
		function clearMessageTimer() {
			if (messageTimer) {
				clearTimeout(messageTimer);
				messageTimer = null;
			}
		}
		//#endregion
		//#region src/client/waifu/modelList.js
		const modelList = [
			[
				"019_birthday_2021",
				"019_birthday_2022",
				"019_casual",
				"019_casual-2023",
				"019_casual_summer",
				"019_casual_summer-2023",
				"019_casual_winter",
				"019_casual_winter-2023",
				"019_collabo_d_3_ur",
				"019_dream_festival_2",
				"019_dream_festival_3_ur",
				"019_dream_festival_4_ur",
				"019_event_203_story_02",
				"019_kirameki_festival",
				"019_live_default",
				"019_live_event_111_ssr",
				"019_live_event_120_r",
				"019_live_event_132_ssr",
				"019_live_event_137_r",
				"019_live_event_148_sr",
				"019_live_event_150_sr",
				"019_live_event_157_sr",
				"019_live_event_165_ssr",
				"019_live_event_173_sr",
				"019_live_event_176_sr",
				"019_live_event_194_ssr",
				"019_live_event_203_ssr",
				"019_live_event_212_sr",
				"019_live_event_217_ur",
				"019_live_event_223_r",
				"019_live_event_234_ur",
				"019_live_event_242_ur",
				"019_live_event_251_r",
				"019_live_event_259_ur",
				"019_live_event_260_r",
				"019_live_event_266_sr",
				"019_live_event_271_ur",
				"019_live_event_272_r",
				"019_live_event_282_ur",
				"019_live_event_293_ssr",
				"019_live_event_302_ssr",
				"019_live_event_305_sr",
				"019_live_event_313_ur",
				"019_live_event_318_ur",
				"019_live_event_326_r",
				"019_live_event_334_ur",
				"019_live_r_2021",
				"019_live_r_2022",
				"019_live_r_2023",
				"019_live_sr_01",
				"019_live_ssr_01",
				"019_miku_shinkai",
				"019_pajamas-2023",
				"019_school_summer",
				"019_school_summer-2023",
				"019_school_winter",
				"019_school_winter-2023",
				"019_vocal_limited_ssr"
			],
			[
				"042_birthday_2021",
				"042_birthday_2022",
				"042_casual",
				"042_casual-2023",
				"042_casual_summer",
				"042_casual_summer-2023",
				"042_casual_winter",
				"042_casual_winter-2023",
				"042_dream_festival_2",
				"042_dream_festival_3_ur",
				"042_dream_festival_4_ur",
				"042_live_default",
				"042_live_event_111_ssr",
				"042_live_event_120_sr",
				"042_live_event_123_sr",
				"042_live_event_132_r",
				"042_live_event_138_ssr",
				"042_live_event_148_r",
				"042_live_event_157_ssr",
				"042_live_event_165_sr",
				"042_live_event_176_ssr",
				"042_live_event_181_sr",
				"042_live_event_194_sr",
				"042_live_event_203_sr",
				"042_live_event_212_ssr",
				"042_live_event_223_sr",
				"042_live_event_227_ur",
				"042_live_event_234_r",
				"042_live_event_242_sr",
				"042_live_event_245_ssr",
				"042_live_event_251_ur",
				"042_live_event_253_sr",
				"042_live_event_259_sr",
				"042_live_event_266_ssr",
				"042_live_event_272_ur",
				"042_live_event_282_r",
				"042_live_event_293_r",
				"042_live_event_296_ssr",
				"042_live_event_305_ur",
				"042_live_event_315_ur",
				"042_live_event_318_r",
				"042_live_event_326_ur",
				"042_live_event_334_ssr",
				"042_live_r_2022",
				"042_live_r_2023",
				"042_live_sr_01",
				"042_live_ssr_01",
				"042_miku_shinkai",
				"042_school_summer",
				"042_school_summer-2023",
				"042_school_winter",
				"042_school_winter-2023"
			],
			[
				"025_birthday_2021",
				"025_birthday_2022",
				"025_casual",
				"025_casual-2023",
				"025_casual_summer",
				"025_casual_summer-2023",
				"025_casual_winter",
				"025_casual_winter-2023",
				"025_dream_festival_2",
				"025_dream_festival_3_ur",
				"025_dream_festival_4_ur",
				"025_kirameki_festival",
				"025_live_default",
				"025_live_event_111_r",
				"025_live_event_114_ssr",
				"025_live_event_120_sr",
				"025_live_event_132_ssr",
				"025_live_event_148_sr",
				"025_live_event_157_ssr",
				"025_live_event_165_sr",
				"025_live_event_176_sr",
				"025_live_event_181_ssr",
				"025_live_event_190_sr",
				"025_live_event_194_ssr",
				"025_live_event_203_sr",
				"025_live_event_212_r",
				"025_live_event_223_ssr",
				"025_live_event_224_sr",
				"025_live_event_234_ur",
				"025_live_event_242_ssr",
				"025_live_event_251_ssr",
				"025_live_event_259_r",
				"025_live_event_260_ur",
				"025_live_event_272_ssr",
				"025_live_event_282_ssr",
				"025_live_event_289_ur",
				"025_live_event_293_ur",
				"025_live_event_305_r",
				"025_live_event_317_ur",
				"025_live_event_318_sr",
				"025_live_event_326_ur",
				"025_live_event_334_sr",
				"025_live_event_335_ssr",
				"025_live_r_2022",
				"025_live_r_2023",
				"025_live_sr_01",
				"025_live_ssr_01",
				"025_miku_shinkai",
				"025_school_summer",
				"025_school_summer-2023",
				"025_school_winter",
				"025_school_winter-2023"
			],
			[
				"044_arbeit",
				"044_birthday_2021",
				"044_birthday_2022",
				"044_casual",
				"044_casual-2023",
				"044_casual_summer",
				"044_casual_summer-2023",
				"044_casual_winter",
				"044_casual_winter-2023",
				"044_dream_festival_2",
				"044_dream_festival_3_ur",
				"044_dream_festival_4_ur",
				"044_live_default",
				"044_live_event_111_sr",
				"044_live_event_120_ssr",
				"044_live_event_132_sr",
				"044_live_event_145_sr",
				"044_live_event_148_ssr",
				"044_live_event_157_r",
				"044_live_event_159_ssr",
				"044_live_event_165_sr",
				"044_live_event_174_r",
				"044_live_event_176_ssr",
				"044_live_event_194_r",
				"044_live_event_203_ssr",
				"044_live_event_212_sr",
				"044_live_event_223_ur",
				"044_live_event_234_ssr",
				"044_live_event_242_ur",
				"044_live_event_251_sr",
				"044_live_event_259_ur",
				"044_live_event_263_ssr",
				"044_live_event_272_ur",
				"044_live_event_277_ssr",
				"044_live_event_282_sr",
				"044_live_event_293_ur",
				"044_live_event_305_ssr",
				"044_live_event_318_ur",
				"044_live_event_325_ur",
				"044_live_event_326_sr",
				"044_live_event_334_r",
				"044_live_r_2022",
				"044_live_r_2023",
				"044_live_sr_01",
				"044_live_ssr_01",
				"044_miku_shinkai",
				"044_school_summer",
				"044_school_summer-2023",
				"044_school_winter",
				"044_school_winter-2023"
			],
			[
				"033_4th_general_election_r",
				"033_birthday_2021",
				"033_birthday_2022",
				"033_casual",
				"033_casual-2023",
				"033_casual_summer",
				"033_casual_summer-2023",
				"033_casual_winter",
				"033_casual_winter-2023",
				"033_dream_festival_2",
				"033_dream_festival_3_ur",
				"033_dream_festival_4_ur",
				"033_kirameki_festival",
				"033_live_default",
				"033_live_event_111_sr",
				"033_live_event_120_ssr",
				"033_live_event_132_sr",
				"033_live_event_148_ssr",
				"033_live_event_150_r",
				"033_live_event_157_sr",
				"033_live_event_165_ssr",
				"033_live_event_176_r",
				"033_live_event_179_ssr",
				"033_live_event_180_sr",
				"033_live_event_190_ssr",
				"033_live_event_194_sr",
				"033_live_event_203_sr",
				"033_live_event_212_ssr",
				"033_live_event_223_ur",
				"033_live_event_227_ssr",
				"033_live_event_234_sr",
				"033_live_event_242_r",
				"033_live_event_251_ur",
				"033_live_event_259_ssr",
				"033_live_event_272_sr",
				"033_live_event_282_ur",
				"033_live_event_293_sr",
				"033_live_event_305_ur",
				"033_live_event_318_ssr",
				"033_live_event_326_ssr",
				"033_live_event_334_ur",
				"033_live_r_2022",
				"033_live_r_2023",
				"033_live_sr_01",
				"033_live_ssr_01",
				"033_miku_shinkai",
				"033_school_summer",
				"033_school_summer-2023",
				"033_school_winter",
				"033_school_winter-2023"
			]
		];
		//#endregion
		//#region src/client/waifu/tips.js
		/**
		* Morfonica 台词包（按 5 角色人设撰写；motion 名取自 Morfonica 模型实际动作集）。
		* 角色顺序：mashiro(0) / touko(1) / nanami(2) / tsukushi(3) / rui(4)。
		*/
		const tips = {
			"message": {
				"default": [
					[
						{
							"text": "那个……今天的歌，也请好好听哦……",
							"motion": "smile01"
						},
						{
							"text": "星星好漂亮……就像大家的笑容一样。",
							"motion": "smile02"
						},
						{
							"text": "虽然我不太会说话……但歌声会传达我的心意。",
							"motion": "serious01"
						},
						{
							"text": "写歌词的时候，总会想起你的事。",
							"motion": "shame01"
						},
						{
							"text": "和Morfonica的大家在一起，我也变得坚强了一点。",
							"motion": "kime01"
						},
						{
							"text": "呜……被夸奖了……好开心……",
							"motion": "shame01"
						},
						{
							"text": "今天的星空，也一定在为我们闪耀。",
							"motion": "smile02"
						},
						{
							"text": "我想把这份心情，写成最棒的歌词。",
							"motion": "serious01"
						},
						{
							"text": "谢谢你，愿意听我唱歌。",
							"motion": "smile03"
						},
						{
							"text": "害怕的时候……就看看星星吧。",
							"motion": "smile01"
						},
						{
							"text": "能遇到大家，真是太好了。",
							"motion": "smile02"
						},
						{
							"text": "明天，也要一起写新的歌哦。",
							"motion": "smile01"
						}
					],
					[
						{
							"text": "嗨——！今天也是超有干劲的一天！",
							"motion": "smile01"
						},
						{
							"text": "吉他声一响，全场都会为我尖叫！",
							"motion": "kime01"
						},
						{
							"text": "星凌学园最强的吉他手，就是我！",
							"motion": "kime01"
						},
						{
							"text": "练习练习再练习，天才也要努力！",
							"motion": "serious01"
						},
						{
							"text": "嘿嘿，被我的演奏迷住了吧？",
							"motion": "smile02"
						},
						{
							"text": "今天也发现了新的有趣事情！",
							"motion": "smile03"
						},
						{
							"text": "Morfonica的舞台，我要让它闪闪发光！",
							"motion": "kime01"
						},
						{
							"text": "诶？你也在看我？那就一起嗨！",
							"motion": "smile01"
						},
						{
							"text": "累的时候，就弹一段最喜欢的曲子！",
							"motion": "smile02"
						},
						{
							"text": "和大家一起的Live，最棒了！",
							"motion": "kime01"
						},
						{
							"text": "嘿，接住这份摇滚的热情！",
							"motion": "smile01"
						},
						{
							"text": "明天也要一起，全力冲刺！",
							"motion": "smile02"
						}
					],
					[
						{
							"text": "啊啦，你来了呢。",
							"motion": "smile01"
						},
						{
							"text": "贝斯的声音，暖暖的，很安心吧？",
							"motion": "smile02"
						},
						{
							"text": "今天也要慢悠悠地，开心地度过哦。",
							"motion": "smile01"
						},
						{
							"text": "嗯……刚才在想，晚饭吃什么好呢。",
							"motion": "nf01"
						},
						{
							"text": "大家健康的样子，就是我最开心的事。",
							"motion": "smile02"
						},
						{
							"text": "啊、抱歉，刚才走神了……你在说什么？",
							"motion": "awate01"
						},
						{
							"text": "Morfonica，是我重要的归宿。",
							"motion": "smile03"
						},
						{
							"text": "累了的话，就到我这里来歇歇吧。",
							"motion": "smile02"
						},
						{
							"text": "今天的风很舒服呢。",
							"motion": "smile01"
						},
						{
							"text": "大家在一起的时间，总是过得很快。",
							"motion": "smile02"
						},
						{
							"text": "啊、想到一个温柔的和弦。",
							"motion": "smile01"
						},
						{
							"text": "下次，也一起喝茶吧。",
							"motion": "smile03"
						}
					],
					[
						{
							"text": "今天的练习，也要全力以赴！",
							"motion": "kime01"
						},
						{
							"text": "努力是不会背叛人的！",
							"motion": "kime01"
						},
						{
							"text": "鼓手是乐队的心脏，我会牢牢撑住！",
							"motion": "serious01"
						},
						{
							"text": "诶？学生会的工作……啊，马上处理！",
							"motion": "awate01"
						},
						{
							"text": "Morfonica的大家，都是我最棒的伙伴！",
							"motion": "smile01"
						},
						{
							"text": "认真的人最美丽！……这是我自己说的！",
							"motion": "kime01"
						},
						{
							"text": "今天的Live，要让全场都沸腾！",
							"motion": "kime01"
						},
						{
							"text": "啊、谢谢你来看我们！",
							"motion": "smile02"
						},
						{
							"text": "累的时候，就想想大家的笑容。",
							"motion": "smile01"
						},
						{
							"text": "学生会和乐队，两边都要做到最好！",
							"motion": "serious01"
						},
						{
							"text": "嘿嘿，今天的练习效果超棒！",
							"motion": "smile02"
						},
						{
							"text": "明天也要一起加油哦！",
							"motion": "kime01"
						}
					],
					[
						{
							"text": "音乐，是至高无上的艺术。",
							"motion": "serious01"
						},
						{
							"text": "我的琴声，会带你到另一个世界。",
							"motion": "kime01"
						},
						{
							"text": "优雅地、准确地、完美地——这就是我的风格。",
							"motion": "kime01"
						},
						{
							"text": "Morfonica的旋律，由我来点缀。",
							"motion": "smile01"
						},
						{
							"text": "你，有在好好聆听吗？",
							"motion": "smile02"
						},
						{
							"text": "偶尔的瑕疵，也是音乐的一部分。",
							"motion": "smile01"
						},
						{
							"text": "今日的琴声，也一如既往地完美。",
							"motion": "kime01"
						},
						{
							"text": "你的存在，让我想奏出更美的旋律。",
							"motion": "smile03"
						},
						{
							"text": "音乐之外的事，我不太感兴趣。",
							"motion": "serious01"
						},
						{
							"text": "嗯，这个音色，很动人。",
							"motion": "smile02"
						},
						{
							"text": "请期待，我与Morfonica的舞台。",
							"motion": "kime01"
						},
						{
							"text": "你的聆听，是我的荣幸。",
							"motion": "smile02"
						}
					]
				],
				"console": [
					{
						"text": "嗯？你也想来听我唱歌吗？",
						"motion": "smile01"
					},
					{
						"text": "嗨！你来啦！",
						"motion": "smile01"
					},
					{
						"text": "啊啦，找我有事吗？",
						"motion": "smile02"
					},
					{
						"text": "来了就好好加油哦！",
						"motion": "kime01"
					},
					{
						"text": "欢迎。要听一曲吗？",
						"motion": "smile01"
					}
				],
				"copy": [
					{
						"text": "复制了什么？是歌词的灵感吗？",
						"motion": "smile01"
					},
					{
						"text": "复制成功！完美！",
						"motion": "kime01"
					},
					{
						"text": "啊、复制好了……小心别弄丢。",
						"motion": "smile01"
					},
					{
						"text": "复制！然后继续努力！",
						"motion": "kime01"
					},
					{
						"text": "复制？小事一桩。",
						"motion": "smile02"
					}
				],
				"visibilitychange": [
					{
						"text": "欢迎回来……一直在等你。",
						"motion": "smile01"
					},
					{
						"text": "你回来啦！",
						"motion": "smile02"
					},
					{
						"text": "欢迎回来，要喝茶吗？",
						"motion": "smile01"
					},
					{
						"text": "回来啦！一起练习吧！",
						"motion": "kime01"
					},
					{
						"text": "你回来了。正好，想听新曲吗？",
						"motion": "smile01"
					}
				]
			},
			"mouseover": [
				{
					"selector": "#waifu-tool-morfonica-switch-model",
					"text": [
						{
							"text": "换人……大家都很温柔呢。",
							"motion": "smile01"
						},
						{
							"text": "换人？好呀好呀！",
							"motion": "smile02"
						},
						{
							"text": "换人？都可以哦。",
							"motion": "smile01"
						},
						{
							"text": "换人？全力切换！",
							"motion": "kime01"
						},
						{
							"text": "换人？嗯，随你。",
							"motion": "smile02"
						}
					]
				},
				{
					"selector": "#waifu-tool-morfonica-photo",
					"text": [
						{
							"text": "拍照？……我、我表情可以吗……",
							"motion": "shame01"
						},
						{
							"text": "拍照！摆最帅的姿势！",
							"motion": "kime01"
						},
						{
							"text": "拍照？啊啦，好啊。",
							"motion": "smile02"
						},
						{
							"text": "拍照！茄子！",
							"motion": "kime01"
						},
						{
							"text": "拍照？可以，为你留影。",
							"motion": "smile01"
						}
					]
				},
				{
					"selector": "#waifu-tool-morfonica-info",
					"text": [
						{
							"text": "想了解Morfonica吗？",
							"motion": "smile01"
						},
						{
							"text": "我们？超厉害的乐队哦！",
							"motion": "kime01"
						},
						{
							"text": "关于我们的事？",
							"motion": "smile02"
						},
						{
							"text": "Morfonica？让我来介绍！",
							"motion": "kime01"
						},
						{
							"text": "想知道我们的故事？",
							"motion": "smile01"
						}
					]
				},
				{
					"selector": "#waifu-tool-morfonica-quit",
					"text": [
						{
							"text": "要走了吗……下次见。",
							"motion": "bye01"
						},
						{
							"text": "拜拜！下次再来！",
							"motion": "bye01"
						},
						{
							"text": "再见，慢走。",
							"motion": "smile01"
						},
						{
							"text": "先走啦！明天见！",
							"motion": "bye01"
						},
						{
							"text": "告退吧。期待再会。",
							"motion": "smile02"
						}
					]
				}
			],
			"seasons": [
				{
					"date": "01/01",
					"text": [
						{
							"text": "新年快乐……今年也请多关照。",
							"motion": "smile01"
						},
						{
							"text": "新年！今年也要闪耀！",
							"motion": "kime01"
						},
						{
							"text": "新年快乐，一起慢慢来。",
							"motion": "smile01"
						},
						{
							"text": "新年！全力出发！",
							"motion": "kime01"
						},
						{
							"text": "新年好。今年也奏响最美的乐章。",
							"motion": "smile02"
						}
					]
				},
				{
					"date": "02/14",
					"text": [
						{
							"text": "情人节……巧克力，要送谁好呢……",
							"motion": "shame01"
						},
						{
							"text": "情人节！巧克力大作战！",
							"motion": "kime01"
						},
						{
							"text": "情人节？啊啦，甜蜜的日子。",
							"motion": "smile02"
						},
						{
							"text": "情人节！把心意做成巧克力！",
							"motion": "kime01"
						},
						{
							"text": "情人节？与我无关……开玩笑的。",
							"motion": "smile01"
						}
					]
				},
				{
					"date": "03/14",
					"text": [
						{
							"text": "白色情人节……回礼，该准备什么……",
							"motion": "shame01"
						},
						{
							"text": "回礼！来首曲子当回礼！",
							"motion": "kime01"
						},
						{
							"text": "回礼？嗯……送你一曲吧。",
							"motion": "smile02"
						},
						{
							"text": "回礼！全力准备！",
							"motion": "kime01"
						},
						{
							"text": "回礼？用音符来回应你的心意。",
							"motion": "smile01"
						}
					]
				},
				{
					"date": "06/01-08/31",
					"text": [
						{
							"text": "夏天……星空最美的季节。",
							"motion": "smile02"
						},
						{
							"text": "夏天！海边Live走起！",
							"motion": "kime01"
						},
						{
							"text": "夏天……西瓜和茶，好惬意。",
							"motion": "smile01"
						},
						{
							"text": "夏天！汗水与摇滚！",
							"motion": "kime01"
						},
						{
							"text": "夏日的旋律，适合用小提琴演绎。",
							"motion": "smile02"
						}
					]
				},
				{
					"date": "09/01-11/30",
					"text": [
						{
							"text": "秋天……适合写温柔的歌。",
							"motion": "smile01"
						},
						{
							"text": "秋天！凉爽！演奏最佳！",
							"motion": "kime01"
						},
						{
							"text": "秋天……落叶和茶香。",
							"motion": "smile02"
						},
						{
							"text": "秋天！文化祭准备！",
							"motion": "kime01"
						},
						{
							"text": "秋日，是沉思与创作的季节。",
							"motion": "smile01"
						}
					]
				},
				{
					"date": "12/01-02/29",
					"text": [
						{
							"text": "冬天……想和重要的人一起看雪。",
							"motion": "smile02"
						},
						{
							"text": "冬天！寒冷也挡不住热情！",
							"motion": "kime01"
						},
						{
							"text": "冬天……围炉喝茶，好幸福。",
							"motion": "smile01"
						},
						{
							"text": "冬天！冬季Live！",
							"motion": "kime01"
						},
						{
							"text": "冬夜的演奏，格外澄澈。",
							"motion": "smile01"
						}
					]
				},
				{
					"date": "12/24-12/26",
					"text": [
						{
							"text": "圣诞……想把祝福唱给你听。",
							"motion": "smile01"
						},
						{
							"text": "圣诞！Live狂欢！",
							"motion": "kime01"
						},
						{
							"text": "圣诞？温馨的夜晚。",
							"motion": "smile02"
						},
						{
							"text": "圣诞！平安夜演出！",
							"motion": "kime01"
						},
						{
							"text": "圣诞夜，奏一曲圣歌。",
							"motion": "smile02"
						}
					]
				},
				{
					"date": "12/31",
					"text": [
						{
							"text": "今年……谢谢你的陪伴。",
							"motion": "smile02"
						},
						{
							"text": "跨年！今年最后的Live！",
							"motion": "kime01"
						},
						{
							"text": "今年辛苦了，慢慢跨年吧。",
							"motion": "smile01"
						},
						{
							"text": "跨年！明年也全力冲刺！",
							"motion": "kime01"
						},
						{
							"text": "岁末，用一曲告别今年。",
							"motion": "smile01"
						}
					]
				}
			],
			"time": [
				{
					"hour": "6-7",
					"text": [
						{
							"text": "早上好……今天也要加油。",
							"motion": "smile01"
						},
						{
							"text": "早！元气满满！",
							"motion": "smile01"
						},
						{
							"text": "早上好，慢慢来。",
							"motion": "smile02"
						},
						{
							"text": "早！晨练开始！",
							"motion": "kime01"
						},
						{
							"text": "晨光，是今日的序曲。",
							"motion": "smile01"
						}
					]
				},
				{
					"hour": "8-11",
					"text": [
						{
							"text": "上午好……在写歌词。",
							"motion": "serious01"
						},
						{
							"text": "上午！练习时间！",
							"motion": "kime01"
						},
						{
							"text": "上午好，喝杯茶吧。",
							"motion": "smile01"
						},
						{
							"text": "上午！学生会+练习！",
							"motion": "kime01"
						},
						{
							"text": "上午，适合练琴。",
							"motion": "serious01"
						}
					]
				},
				{
					"hour": "12-13",
					"text": [
						{
							"text": "午饭……大家一起去吃吧。",
							"motion": "smile01"
						},
						{
							"text": "午饭！吃饱再战！",
							"motion": "smile02"
						},
						{
							"text": "午饭时间，开心。",
							"motion": "smile01"
						},
						{
							"text": "午饭！补充能量！",
							"motion": "kime01"
						},
						{
							"text": "午餐，是优雅的时光。",
							"motion": "smile02"
						}
					]
				},
				{
					"hour": "14-16",
					"text": [
						{
							"text": "下午……练习室见。",
							"motion": "smile01"
						},
						{
							"text": "下午！全力演奏！",
							"motion": "kime01"
						},
						{
							"text": "下午茶时间，要一起吗？",
							"motion": "smile02"
						},
						{
							"text": "下午！练习练习！",
							"motion": "kime01"
						},
						{
							"text": "午后，旋律流淌。",
							"motion": "smile01"
						}
					]
				},
				{
					"hour": "17-19",
					"text": [
						{
							"text": "傍晚……夕阳好美。",
							"motion": "smile02"
						},
						{
							"text": "傍晚！Live前热身！",
							"motion": "kime01"
						},
						{
							"text": "傍晚，散步的好时间。",
							"motion": "smile01"
						},
						{
							"text": "傍晚！准备演出！",
							"motion": "kime01"
						},
						{
							"text": "黄昏，是演奏的序章。",
							"motion": "smile01"
						}
					]
				},
				{
					"hour": "20-21",
					"text": [
						{
							"text": "晚上好……星星出来了。",
							"motion": "smile02"
						},
						{
							"text": "晚上！Live时间！",
							"motion": "kime01"
						},
						{
							"text": "晚上好，要喝茶吗？",
							"motion": "smile01"
						},
						{
							"text": "晚上！演出开始！",
							"motion": "kime01"
						},
						{
							"text": "夜晚的舞台，属于音乐。",
							"motion": "smile02"
						}
					]
				},
				{
					"hour": "22-23",
					"text": [
						{
							"text": "夜深了……该睡了。",
							"motion": "sleep01"
						},
						{
							"text": "深夜……还想再练会儿。",
							"motion": "kime01"
						},
						{
							"text": "夜深了，早点休息。",
							"motion": "smile01"
						},
						{
							"text": "深夜……明天还有事，睡了！",
							"motion": "sleep01"
						},
						{
							"text": "夜深，曲终人散。",
							"motion": "smile01"
						}
					]
				},
				{
					"hour": "0-5",
					"text": [
						{
							"text": "凌晨……还在看星星吗？",
							"motion": "smile01"
						},
						{
							"text": "凌晨……（睡着了）",
							"motion": "sleep02"
						},
						{
							"text": "凌晨……该睡了哦。",
							"motion": "sleep01"
						},
						{
							"text": "凌晨……明天还要早起！",
							"motion": "sleep01"
						},
						{
							"text": "深夜……偶尔失眠，就练琴。",
							"motion": "serious01"
						}
					]
				}
			]
		};
		//#endregion
		//#region src/client/waifu/model.js
		const PIXI = { get Application() {
			return window.PIXI.Application;
		} };
		const Live2DModel = { get value() {
			return window.PIXI.live2d.Live2DModel;
		} };
		/**
		* 适合作为随机待机动作的 motion 组名。
		* 各角色的可用动作集不同，加载时会被过滤成该角色实际存在的集合。
		* （Morfonica 模型动作集：smile01-04 / nf01-05 / nnf01-05 / kime01-02 /
		*   sad01-02 / surprised01-03 / serious01-02 / shame01 / niyaniya01 /
		*   oowarai01 / wink01 / sing01 / nod01-02 / sleep01-02 / eeto01 / jaan01 等）
		*/
		const IDLE_MOTIONS = [
			"smile01",
			"smile02",
			"smile03",
			"smile04",
			"smile05",
			"smile06",
			"thinking01",
			"thinking02",
			"nf01",
			"nf02",
			"nnf01",
			"nnf02",
			"kandou01",
			"kime01",
			"sad01",
			"surprised01",
			"serious01",
			"shame01",
			"niya01",
			"ando01",
			"odoodo01",
			"sigh01",
			"niyaniya01",
			"oowarai01",
			"wink01",
			"sing01",
			"nod01",
			"nod02",
			"sleep01",
			"eeto01",
			"jaan01",
			"gattsu01"
		];
		var Model = class {
			constructor() {
				this.cdnPath = getConfig().cdnPath;
				this.app = new PIXI.Application({
					view: document.getElementById("live2d-morfonica"),
					autoStart: true,
					width: 800,
					height: 800,
					backgroundAlpha: 0
				});
				this.modelList = modelList;
				this.tips = tips;
				this.model = null;
				this.modelIndex = null;
				this.modelMotions = [];
				this.modelExpressions = [];
				this.idleMotions = [];
			}
			async loadModel(modelId, modelTexturesId, message) {
				if (modelId >= this.modelList.length) modelId %= this.modelList.length;
				if (modelTexturesId >= this.modelList[modelId].length) modelTexturesId %= this.modelList[modelId].length;
				setModelId(modelId);
				setModelTexturesId(modelTexturesId);
				console.log(`Live2D Model ${modelId}-${modelTexturesId}`);
				showMessage(this, message, 4e3, 10);
				const target = this.modelList[modelId][modelTexturesId];
				const url = `${this.cdnPath}model/${target}/index.json`;
				try {
					this.modelIndex = await fetch(url).then((response) => {
						if (!response.ok) throw new Error(`HTTP ${response.status}`);
						return response.json();
					});
				} catch (error) {
					console.error(`模型加载失败: ${url}`, error);
					showMessage(this, {
						text: "呜……模型加载失败了，换个衣服试试？",
						motion: "sad01"
					}, 5e3, 10);
					return;
				}
				this.modelIndex.url = url;
				if (!this.modelIndex.motions.idle && this.modelIndex.motions.idle01) this.modelIndex.motions.idle = this.modelIndex.motions.idle01;
				if (Array.isArray(this.modelIndex.expressions) && !this.modelIndex.expressions.find((expression) => expression.name === "idle") && this.modelIndex.expressions.find((expression) => expression.name === "idle01")) this.modelIndex.expressions.push({
					name: "idle",
					file: this.modelIndex.expressions.find((expression) => expression.name === "idle01").file
				});
				this.modelMotions = Object.keys(this.modelIndex.motions || {});
				this.modelExpressions = (this.modelIndex.expressions || []).map((expression) => expression.name);
				this.idleMotions = IDLE_MOTIONS.filter((motion) => this.modelMotions.includes(motion));
				this.app.stage.removeChildren();
				try {
					this.model = await Live2DModel.value.from(this.modelIndex, { motionPreload: getConfig().preload });
				} catch (error) {
					console.error("Live2D 模型渲染初始化失败", error);
					showMessage(this, {
						text: "呜……渲染器罢工了，刷新一下试试？",
						motion: "sad01"
					}, 5e3, 10);
					return;
				}
				this.app.stage.addChild(this.model);
				this.model.scale.set(.33);
				updateMessageArray(this.tips);
			}
			/** 播放一个随机的待机动作（不弹气泡） */
			playRandomIdle() {
				if (!this.model || !this.idleMotions.length) return;
				const motion = this.idleMotions[Math.floor(Math.random() * this.idleMotions.length)];
				try {
					this.model.motion(motion);
				} catch (error) {}
			}
			/** 随机切换一个表情 */
			playRandomExpression() {
				if (!this.model || !this.modelExpressions.length) return;
				const expression = this.modelExpressions[Math.floor(Math.random() * this.modelExpressions.length)];
				try {
					this.model.expression(expression);
				} catch (error) {}
			}
			/** 让模型视线跟随屏幕坐标（canvas 空间，可超出 0~800） */
			focusAt(clientX, clientY) {
				if (!this.model) return;
				const canvas = this.app.view;
				const rect = canvas.getBoundingClientRect();
				if (rect.width === 0 || rect.height === 0) return;
				const x = (clientX - rect.left) * (canvas.width / rect.width);
				const y = (clientY - rect.top) * (canvas.height / rect.height);
				try {
					this.model.focus(x, y);
				} catch (error) {}
			}
			/** 截取当前画面为 PNG dataURL */
			capture() {
				if (!this.model) return null;
				try {
					return this.app.renderer.plugins.extract.canvas(this.app.stage).toDataURL("image/png");
				} catch (error) {
					try {
						return this.app.view.toDataURL("image/png");
					} catch (error2) {
						return null;
					}
				}
			}
		};
		//#endregion
		//#region src/client/waifu/tools.js
		const fa_circle_user = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM512 256c0 141.4-114.6 256-256 256S0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM256 272c39.8 0 72-32.2 72-72s-32.2-72-72-72s-72 32.2-72 72s32.2 72 72 72z\"/></svg>");
		const fa_camera_retro = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M220.6 121.2L271.1 96 448 96v96H333.2c-21.9-15.1-48.5-24-77.2-24s-55.2 8.9-77.2 24H64V128H192c9.9 0 19.7-2.3 28.6-6.8zM0 128V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H271.1c-9.9 0-19.7 2.3-28.6 6.8L192 64H160V48c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16l0 16C28.7 64 0 92.7 0 128zM344 304c0 48.6-39.4 88-88 88s-88-39.4-88-88s39.4-88 88-88s88 39.4 88 88z\"/></svg>");
		const fa_circle_info = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path d=\"M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z\"/></svg>");
		const fa_xmark = "data:image/svg+xml," + encodeURIComponent("<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 512\"><path d=\"M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z\"/></svg>");
		const tools = {
			"switch-model": {
				icon: fa_circle_user,
				callback: () => {}
			},
			"photo": {
				icon: fa_camera_retro,
				callback: () => {}
			},
			"info": {
				icon: fa_circle_info,
				callback: () => {
					showMessage({
						expression: () => null,
						motion: () => null
					}, {
						text: "Morfonica Live2D 桌宠插件 · 5 角色 × 262 套换装",
						motion: "smile01"
					}, 4e3, 10);
				}
			},
			"quit": {
				icon: fa_xmark,
				callback: () => {
					localStorage.setItem("morfonica-waifu-display", Date.now());
					const waifu = document.getElementById("waifu-morfonica");
					if (waifu) waifu.style.bottom = "-500px";
					setTimeout(() => {
						const toggle = document.getElementById("waifu-toggle-morfonica");
						if (toggle) toggle.classList.add("waifu-toggle-active");
					}, 3e3);
				}
			}
		};
		//#endregion
		//#region src/client/waifu/characters.js
		/**
		* 角色元数据与模型资源名工具（Morfonica 版）。
		*
		* 模型目录为 `<standalone编号>_<资源id>`（如 `019_casual-2023`），编号来自
		* 独立版 BANDORI 看板娘的 STANDALONE_CHARS。换装面板的显示名由 textureLabel()
		* 把资源段名翻译成中文，目录名本身保持不变。
		*/
		const CHARACTERS = [
			{
				"id": "mashiro",
				"num": 19,
				"name": "倉田 真白",
				"en": "MASHIRO",
				"color": "#a8b8e8"
			},
			{
				"id": "touko",
				"num": 42,
				"name": "桐谷 透子",
				"en": "TOUKO",
				"color": "#ffb74d"
			},
			{
				"id": "nanami",
				"num": 25,
				"name": "広町 七深",
				"en": "NANAMI",
				"color": "#aed581"
			},
			{
				"id": "tsukushi",
				"num": 44,
				"name": "二葉 筑紫",
				"en": "TSUKUSHI",
				"color": "#f48fb1"
			},
			{
				"id": "rui",
				"num": 33,
				"name": "八潮 瑠唯",
				"en": "RUI",
				"color": "#b39ddb"
			}
		];
		const LABEL_RULES = [
			[/^casual_summer-2023$/, "夏常服2023"],
			[/^casual_winter-2023$/, "冬常服2023"],
			[/^casual-2023$/, "常服2023"],
			[/^casual_summer$/, "夏常服"],
			[/^casual_winter$/, "冬常服"],
			[/^casual$/, "常服"],
			[/^school_summer-2023$/, "校服夏2023"],
			[/^school_winter-2023$/, "校服冬2023"],
			[/^school_summer$/, "校服夏"],
			[/^school_winter_v3$/, "校服冬V3"],
			[/^school_winter$/, "校服冬"],
			[/^school_winter_s2$/, "校服冬S2"],
			[/^school_summer_s2$/, "校服夏S2"],
			[/^swimsuit-2023$/, "泳装2023"],
			[/^swimsuit$/, "泳装"],
			[/^yukata$/, "浴衣"],
			[/^(\d{4})_furisode$/, "振袖$1"],
			[/^arbeit$/, "打工"],
			[/^pajamas-(\d{4})$/, "睡衣$1"],
			[/^pajamas$/, "睡衣"],
			[/^chapter0_pajamas$/, "序章睡衣"],
			[/^chapter0_live$/, "序章演出"],
			[/^gym_clothes$/, "体操服"],
			[/^cafe$/, "咖啡厅"],
			[/^halloween$/, "万圣节"],
			[/^christmas_01$/, "圣诞"],
			[/^fantasy$/, "奇幻"],
			[/^garupa_t$/, "ガルパT恤"],
			[/^birthday_(\d{4})$/, "生日$1"],
			[/^birthday$/, "生日"],
			[/^dream_festival_(\d+)(_ur)?$/, "梦祭$1"],
			[/^dream_festival$/, "梦祭"],
			[/^collabo_d_1_ur$/, "联动D1"],
			[/^collabo_d_2_ur$/, "联动D2"],
			[/^collabo_i_2_ur$/, "联动I2"],
			[/^3rd_general_election_r$/, "第3届总选举"],
			[/^4th_general_election_r$/, "第4届总选举"],
			[/^2nd_general_election_r$/, "第2届总选举"],
			[/^2018_dog$/, "戌年2018"],
			[/^2021af$/, "周年祭2021"],
			[/^girlparty2019$/, "少女派对2019"],
			[/^kirameki_festival$/, "闪耀祭"],
			[/^kirameki_festival_coat$/, "闪耀祭外套"],
			[/^precious_summer$/, "珍贵夏日"],
			[/^special_5th$/, "5周年特别"],
			[/^miku_migikata$/, "初音联动·右肩"],
			[/^live_default$/, "默认演出"],
			[/^live_r_(\d{4})$/, "演出R$1"],
			[/^live_r$/, "演出R"],
			[/^live_sr_(\d+)$/, "演出SR$1"],
			[/^live_ssr_(\d+)$/, "演出SSR$1"],
			[/^live_event_(\d+)_([a-z]+)$/, (m, n, r) => `活动${+n} ${r.toUpperCase()}`],
			[/^live_event_(\d+)$/, (m, n) => `活动${+n}`],
			[/^event_(\d+)_story_(\d+)$/, "活动$1剧情$2"]
		];
		/**
		* 从模型目录名中提取展示标签（中文）。
		* `047_live_event_41_sr` → 「活动41 SR」；未命中规则的段名回退原始段名。
		*/
		function textureLabel(dir) {
			const seg = dir.split("/").pop();
			const body = seg.replace(/^\d{3}_/, "");
			for (const [re, out] of LABEL_RULES) if (re.test(body)) return body.replace(re, out);
			return seg;
		}
		/** 去掉目录名末尾的中文标签，得到原始资源 id（本版本段名无中文标签，原样返回）。 */
		function stripTextureLabel(dir) {
			return dir.replace(/_\p{Script=Han}[\p{Script=Han}0-9A-Za-z]*$/u, "");
		}
		/** 由模型目录名得到平铺在 `assets/` 下的资源文件名。 */
		function textureAssetId(dir) {
			return stripTextureLabel(dir);
		}
		/**
		* 该换装是否有缩略图资源。本版本无逐套缩略图，一律返回 false（面板显示文字标签）。
		*/
		function hasTextureAsset(dir) {
			return false;
		}
		//#endregion
		//#region src/client/waifu/index.js
		const TOOL_TITLES = {
			"switch-model": "切换角色",
			"photo": "拍照",
			"info": "关于",
			"quit": "隐藏"
		};
		/** 轻量监听/定时器收集器：插件卸载时统一清理 */
		function createHooks() {
			const listeners = [];
			const intervals = [];
			return {
				on(target, event, fn) {
					target.addEventListener(event, fn);
					listeners.push([
						target,
						event,
						fn
					]);
				},
				interval(fn, ms) {
					intervals.push(setInterval(fn, ms));
				},
				stop() {
					for (const [target, event, fn] of listeners) try {
						target.removeEventListener(event, fn);
					} catch {}
					for (const id of intervals) clearInterval(id);
					listeners.length = 0;
					intervals.length = 0;
				}
			};
		}
		async function loadWidget(hooks) {
			document.body.insertAdjacentHTML("beforeend", `
    <div id="waifu-morfonica">
      <canvas id="live2d-morfonica" width="800" height="800"></canvas>
      <div id="waifu-tips-morfonica"></div>
      <div id="waifu-tool-morfonica"></div>
    </div>
    <div id="model-selection-panel-morfonica" class="waifu-panel waifu-panel-morfonica" style="display: none;"></div>
    <div id="texture-selection-panel-morfonica" class="waifu-panel waifu-panel-morfonica" style="display: none;"></div>`);
			const model = new Model();
			localStorage.removeItem("morfonica-waifu-display");
			sessionStorage.removeItem("morfonica-waifu-text");
			const waifu = document.getElementById("waifu-morfonica");
			const toolBar = document.getElementById("waifu-tool-morfonica");
			const modelPanel = document.getElementById("model-selection-panel-morfonica");
			const texturePanel = document.getElementById("texture-selection-panel-morfonica");
			let selectedModelIndex = null;
			for (const panel of [modelPanel, texturePanel]) panel.addEventListener("wheel", (event) => event.stopPropagation(), {
				passive: true,
				capture: true
			});
			const drag = enableDrag(waifu);
			restorePosition(waifu);
			const waifuRect = () => waifu.getBoundingClientRect();
			function openPanel(panel) {
				panel.style.display = "block";
				const pw = panel.offsetWidth, ph = panel.offsetHeight;
				const rect = waifuRect();
				let left = rect.right + 8;
				if (left + pw > window.innerWidth - 8) left = rect.left - pw - 8;
				left = Math.max(8, Math.min(left, window.innerWidth - pw - 8));
				const top = Math.max(8, Math.min(rect.top, window.innerHeight - ph - 8));
				panel.style.position = "fixed";
				panel.style.left = left + "px";
				panel.style.top = top + "px";
				panel.style.right = "auto";
				panel.style.bottom = "auto";
			}
			function closePanels() {
				modelPanel.style.display = "none";
				texturePanel.style.display = "none";
			}
			tools["switch-model"].callback = () => {
				if (modelPanel.style.display !== "none") {
					closePanels();
					return;
				}
				renderModelPanel();
				openPanel(modelPanel);
			};
			tools["photo"].callback = () => {
				const url = model.capture();
				if (!url) {
					showMessage(model, {
						text: "呜……拍照失败了，再试一次吧？",
						motion: "sad01"
					}, 4e3, 10);
					return;
				}
				const a = document.createElement("a");
				a.href = url;
				a.download = `live2d-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-")}.png`;
				document.body.appendChild(a);
				a.click();
				a.remove();
				showMessage(model, {
					text: "拍好啦！这张照片，要好好珍藏哦！",
					motion: "smile01"
				}, 4e3, 10);
			};
			if (!Array.isArray(getConfig().tools)) getConfig().tools = Object.keys(tools);
			for (const tool of getConfig().tools) {
				if (!tools[tool]) continue;
				const { icon, callback } = tools[tool];
				toolBar.insertAdjacentHTML("beforeend", `<span id="waifu-tool-morfonica-${tool}" title="${TOOL_TITLES[tool] || tool}">${decodeURIComponent(icon).replace("data:image/svg+xml,", "")}</span>`);
				document.getElementById(`waifu-tool-morfonica-${tool}`).addEventListener("click", callback);
			}
			function renderModelPanel() {
				let html = "";
				modelList.forEach((textures, index) => {
					const char = CHARACTERS[index];
					const asset = `${getConfig().cdnPath}assets/chara_icon_${char.num}.png`;
					html += `
            <button class="model-option" data-model-index="${index}" style="--accent:${char.color}">
              <img src="${asset}" alt="${char.name}" loading="lazy">
              <span class="model-option-text">
                <span class="model-option-name">${char.name}</span>
                <span class="model-option-en">${char.en}</span>
              </span>
            </button>`;
				});
				modelPanel.innerHTML = `
            <div class="waifu-panel-header"><span>选择角色</span><button class="waifu-panel-close" aria-label="关闭">✕</button></div>
            <div class="waifu-panel-body">${html}</div>`;
			}
			function renderTexturePanel(charIndex) {
				const char = CHARACTERS[charIndex];
				const textures = modelList[charIndex];
				let html = "";
				textures.forEach((dir, index) => {
					const label = textureLabel(dir);
					const base = textureAssetId(dir);
					const asset = `${getConfig().cdnPath}assets/${base}.png`;
					if (hasTextureAsset(dir)) html += `
                <button class="texture-option" data-texture-index="${index}">
                  <img src="${asset}" alt="${label}" loading="lazy">
                  <span>${label}</span>
                </button>`;
					else html += `
                <button class="texture-option texture-option-text" data-texture-index="${index}">
                  <span>${label}</span>
                </button>`;
				});
				texturePanel.innerHTML = `
            <div class="waifu-panel-header">
              <button class="waifu-panel-back" aria-label="返回">←</button>
              <span>${char.name} · 换装</span>
              <button class="waifu-panel-close" aria-label="关闭">✕</button>
            </div>
            <div class="waifu-panel-body">${html}</div>`;
			}
			hooks.on(modelPanel, "click", async (event) => {
				if (event.target.closest(".waifu-panel-close")) {
					closePanels();
					return;
				}
				const button = event.target.closest(".model-option");
				if (!button) return;
				selectedModelIndex = parseInt(button.getAttribute("data-model-index"), 10);
				renderTexturePanel(selectedModelIndex);
				modelPanel.style.display = "none";
				openPanel(texturePanel);
			});
			hooks.on(texturePanel, "click", async (event) => {
				if (event.target.closest(".waifu-panel-close")) {
					closePanels();
					return;
				}
				if (event.target.closest(".waifu-panel-back")) {
					texturePanel.style.display = "none";
					openPanel(modelPanel);
					return;
				}
				const button = event.target.closest(".texture-option");
				if (!button) return;
				const textureIndex = parseInt(button.getAttribute("data-texture-index"), 10);
				closePanels();
				await model.loadModel(selectedModelIndex, textureIndex);
			});
			hooks.on(document, "click", (event) => {
				if (event.target.closest("#model-selection-panel-morfonica") || event.target.closest("#texture-selection-panel-morfonica") || event.target.closest("#waifu-tool-morfonica") || event.target.closest("#waifu-toggle-morfonica")) return;
				closePanels();
			});
			hooks.on(document, "keydown", (event) => {
				if (event.key === "Escape") closePanels();
			});
			registerEventListener(model, drag, hooks);
			const api = {
				loadModel: (charId, texId) => model.loadModel(charId, texId),
				getModelList: () => modelList,
				getState: () => ({
					modelId: getModelId(),
					modelTexturesId: getModelTexturesId()
				}),
				capture: () => model.capture(),
				playRandomIdle: () => model.playRandomIdle(),
				showMessage,
				debug: () => ({
					stageChildren: model.app.stage.children.length,
					modelLoaded: !!model.model,
					modelSize: model.model ? {
						w: Math.round(model.model.width),
						h: Math.round(model.model.height)
					} : null,
					appRunning: !!(model.app.ticker && model.app.ticker.started),
					canvas: model.app.view ? {
						id: model.app.view.id,
						w: model.app.view.width,
						h: model.app.view.height
					} : null,
					pixiVersion: window.PIXI && window.PIXI.VERSION
				})
			};
			window.L2D = api;
			if (getModelId() === null) resetModelState();
			await model.loadModel(getModelId(), getModelTexturesId());
			return () => {
				hooks.stop();
				clearMessageTimer();
				try {
					model.app.destroy(true);
				} catch {}
				for (const el of [
					waifu,
					modelPanel,
					texturePanel
				]) try {
					if (el && el.parentNode) el.parentNode.removeChild(el);
				} catch {}
				if (window.L2D === api) window.L2D = void 0;
			};
		}
		function enableDrag(widgetEl) {
			const drag = {
				active: false,
				moved: false,
				startX: 0,
				startY: 0,
				originX: 0,
				originY: 0
			};
			widgetEl.addEventListener("pointerdown", (event) => {
				if (event.target.closest("#waifu-tool-morfonica") || event.target.closest(".waifu-panel-morfonica") || event.target.closest("#waifu-toggle-morfonica")) return;
				drag.active = true;
				drag.moved = false;
				drag.startX = event.clientX;
				drag.startY = event.clientY;
				const rect = widgetEl.getBoundingClientRect();
				drag.originX = rect.left;
				drag.originY = rect.top;
				widgetEl.classList.add("waifu-dragging");
				try {
					widgetEl.setPointerCapture(event.pointerId);
				} catch (error) {}
			});
			widgetEl.addEventListener("pointermove", (event) => {
				if (!drag.active) return;
				const dx = event.clientX - drag.startX;
				const dy = event.clientY - drag.startY;
				if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
				if (!drag.moved) return;
				const left = Math.min(Math.max(drag.originX + dx, -120), window.innerWidth - 40);
				const top = Math.min(Math.max(drag.originY + dy, -80), window.innerHeight - 40);
				widgetEl.style.left = left + "px";
				widgetEl.style.top = top + "px";
				widgetEl.style.right = "auto";
				widgetEl.style.bottom = "auto";
			});
			const endDrag = (event) => {
				if (!drag.active) return;
				drag.active = false;
				widgetEl.classList.remove("waifu-dragging");
				if (drag.moved) {
					const rect = widgetEl.getBoundingClientRect();
					try {
						localStorage.setItem("morfonica-waifu-pos", JSON.stringify({
							left: rect.left,
							top: rect.top
						}));
					} catch (error) {}
				}
			};
			widgetEl.addEventListener("pointerup", endDrag);
			widgetEl.addEventListener("pointercancel", endDrag);
			return drag;
		}
		function restorePosition(widgetEl) {
			try {
				const pos = JSON.parse(localStorage.getItem("morfonica-waifu-pos"));
				if (!pos || typeof pos.left !== "number" || typeof pos.top !== "number") return;
				const left = Math.min(Math.max(pos.left, -120), window.innerWidth - 40);
				const top = Math.min(Math.max(pos.top, -80), window.innerHeight - 40);
				widgetEl.style.left = left + "px";
				widgetEl.style.top = top + "px";
				widgetEl.style.right = "auto";
				widgetEl.style.bottom = "auto";
			} catch (error) {}
		}
		function registerEventListener(model, drag, hooks) {
			let userAction = false;
			let idleSeconds = 0;
			let lastHoverElement;
			let lastFocusTime = 0;
			hooks.on(window, "mousemove", (event) => {
				userAction = true;
				const now = Date.now();
				if (now - lastFocusTime > 50) {
					lastFocusTime = now;
					model.focusAt(event.clientX, event.clientY);
				}
			});
			hooks.on(window, "mousedown", () => userAction = true);
			hooks.on(window, "keydown", () => userAction = true);
			hooks.on(window, "scroll", () => userAction = true, true);
			hooks.interval(() => {
				if (userAction) {
					userAction = false;
					idleSeconds = 0;
					return;
				}
				idleSeconds++;
				if (idleSeconds === 18) showMessage(model, getMessageArray(), 6e3, 9);
				else if (idleSeconds > 18 && idleSeconds % 30 === 0) model.playRandomIdle();
			}, 1e3);
			hooks.on(window, "mouseover", (event) => {
				if (event.target.closest("#live2d-morfonica")) {
					showMessage(model, getMessageArray(), 4e3, 9);
					return;
				}
				for (const { selector, text } of tips.mouseover) {
					if (!event.target.closest(selector)) continue;
					if (lastHoverElement === selector) return;
					lastHoverElement = selector;
					showMessage(model, randomSelection(text[getModelId()]), 4e3, 10);
					return;
				}
			});
			hooks.on(window, "click", (event) => {
				if (drag.moved) return;
				if (event.target.closest("#live2d-morfonica")) {
					showMessage(model, getMessageArray(), 4e3, 9);
					return;
				}
				for (const { selector, text } of tips.mouseover) {
					if (!event.target.closest(selector)) continue;
					showMessage(model, randomSelection(text[getModelId()]), 4e3, 10);
					return;
				}
			});
			hooks.on(window, "resize", () => {
				const threshold = 160;
				const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
				const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
				if (widthDiff > threshold || heightDiff > threshold) showMessage(model, tips.message.console[getModelId()], 6e3, 9);
			});
			hooks.on(window, "copy", () => {
				showMessage(model, tips.message.copy[getModelId()], 6e3, 9);
			});
			hooks.on(document, "visibilitychange", () => {
				if (!document.hidden) showMessage(model, tips.message.visibilitychange[getModelId()], 6e3, 9);
			});
		}
		/**
		* 启动桌宠。返回停止函数（插件卸载时调用）：清理监听/定时器、销毁渲染器、移除 DOM。
		*/
		async function initWidget(config) {
			const hooks = createHooks();
			setConfig(config);
			document.getElementById("waifu-toggle-morfonica")?.remove();
			document.getElementById("waifu-morfonica")?.remove();
			document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle-morfonica"><span>Live2D</span></div>`);
			const toggle = document.getElementById("waifu-toggle-morfonica");
			let stopWidget = () => {};
			const toggleStop = () => {
				hooks.stop();
				try {
					if (toggle && toggle.parentNode) toggle.parentNode.removeChild(toggle);
				} catch {}
				stopWidget();
			};
			hooks.on(toggle, "click", async () => {
				toggle.classList.remove("waifu-toggle-active");
				if (toggle.getAttribute("first-time")) {
					stopWidget = await loadWidget(hooks);
					toggle.removeAttribute("first-time");
				} else {
					localStorage.removeItem("morfonica-waifu-display");
					const waifuEl = document.getElementById("waifu-morfonica");
					if (waifuEl) {
						waifuEl.style.display = "";
						setTimeout(() => {
							waifuEl.style.bottom = "20px";
						}, 0);
					}
				}
			});
			if (localStorage.getItem("morfonica-waifu-display") && Date.now() - localStorage.getItem("morfonica-waifu-display") <= 864e5) {
				toggle.setAttribute("first-time", true);
				setTimeout(() => {
					toggle.classList.add("waifu-toggle-active");
				}, 0);
			} else stopWidget = await loadWidget(hooks);
			return toggleStop;
		}
		//#endregion
		//#region src/client/waifuCss.ts
		var waifuCss_default = "/* ============ 侧边开关（隐藏后用于唤回） ============ */\n#waifu-toggle-morfonica {\n  background: linear-gradient(180deg, #9b8cff, #6b5ce7);\n  border-radius: 6px 6px 0 0;\n  bottom: 198px;\n  color: #fff;\n  cursor: pointer;\n  font-size: 12px;\n  left: 0;\n  margin-left: -100px;\n  padding: 6px 3px 6px 6px;\n  position: fixed;\n  transition: margin-left 1s;\n  width: 60px;\n  writing-mode: vertical-rl;\n  z-index: 998;\n  letter-spacing: 2px;\n  box-shadow: 0 2px 8px rgba(107, 92, 231, 0.35);\n}\n\n#waifu-toggle-morfonica.waifu-toggle-active {\n  margin-left: -50px;\n}\n\n#waifu-toggle-morfonica.waifu-toggle-active:hover {\n  margin-left: -30px;\n}\n\n/* ============ 主体容器 ============ */\n#waifu-morfonica {\n  bottom: 20px;\n  left: -40px;\n  line-height: 0;\n  margin-bottom: 0;\n  position: fixed;\n  transform: translateY(0);\n  transition: transform 0.3s ease-in-out, bottom 3s ease-in-out;\n  z-index: 997;\n  touch-action: none; /* 拖拽时不触发页面手势 */\n}\n\n#waifu-morfonica:not(.waifu-dragging):hover {\n  transform: translateY(-5px);\n}\n\n#waifu-morfonica.waifu-dragging {\n  cursor: grabbing;\n  user-select: none;\n}\n\n/* ============ 气泡 ============ */\n#waifu-tips-morfonica {\n  animation: shake 50s ease-in-out 5s infinite;\n  background: rgba(255, 255, 255, 0.92);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  border: 1px solid rgba(107, 92, 231, 0.15);\n  border-radius: 14px;\n  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);\n  font-size: 14px;\n  line-height: 24px;\n  margin: -30px 30px;\n  min-height: 86px;\n  opacity: 0;\n  overflow: hidden;\n  padding: 10px 12px;\n  position: absolute;\n  text-overflow: ellipsis;\n  transition: opacity 1s;\n  width: 240px;\n  word-break: break-all;\n  top: 0;\n  left: 20px;\n  pointer-events: none;\n  color: #333;\n}\n\n#waifu-tips-morfonica::after {\n  content: \"\";\n  position: absolute;\n  left: 30px;\n  bottom: -8px;\n  width: 0;\n  height: 0;\n  border-left: 8px solid transparent;\n  border-right: 8px solid transparent;\n  border-top: 8px solid rgba(255, 255, 255, 0.92);\n  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.08));\n}\n\n#waifu-tips-morfonica.waifu-tips-active {\n  opacity: 1;\n  transition: opacity 0.2s;\n}\n\n#waifu-tips-morfonica span {\n  color: #6b5ce7;\n  font-weight: 600;\n}\n\n/* ============ 画布 ============ */\n#live2d-morfonica {\n  cursor: grab;\n  height: 400px;\n  position: relative;\n  width: 400px;\n}\n\n#live2d-morfonica:active {\n  cursor: grabbing;\n}\n\n/* ============ 工具按钮栏 ============ */\n#waifu-tool-morfonica {\n  background: rgba(255, 255, 255, 0.7);\n  backdrop-filter: blur(8px);\n  -webkit-backdrop-filter: blur(8px);\n  border: 1px solid rgba(0, 0, 0, 0.06);\n  border-radius: 12px;\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);\n  color: #aaa;\n  opacity: 0;\n  padding: 6px 4px;\n  position: absolute;\n  right: 96px;\n  top: 56px;\n  transition: opacity 0.6s;\n  z-index: 5;\n}\n\n#waifu-morfonica:hover #waifu-tool-morfonica,\n#waifu-tool-morfonica:hover {\n  opacity: 1;\n}\n\n#waifu-tool-morfonica span {\n  display: block;\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n}\n\n#waifu-tool-morfonica svg {\n  fill: #7b8c9d;\n  cursor: pointer;\n  height: 22px;\n  vertical-align: middle;\n  transition: fill 0.3s, transform 0.3s;\n}\n\n#waifu-tool-morfonica svg:hover {\n  fill: #6b5ce7;\n  transform: scale(1.15);\n}\n\n/* ============ 选择面板 ============ */\n.waifu-panel {\n  display: none;\n  position: fixed;\n  z-index: 999;\n  background: rgba(24, 22, 40, 0.94);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border: 1px solid rgba(139, 124, 255, 0.25);\n  border-radius: 14px;\n  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);\n  color: #eee;\n  width: 300px;\n  max-height: 70vh;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\n.waifu-panel-header {\n  align-items: center;\n  display: flex;\n  flex-shrink: 0;\n  gap: 8px;\n  justify-content: space-between;\n  padding: 10px 12px;\n  font-size: 14px;\n  font-weight: 600;\n  color: #cfc7ff;\n  border-bottom: 1px solid rgba(139, 124, 255, 0.15);\n}\n\n.waifu-panel-header .waifu-panel-back {\n  background: none;\n  border: none;\n  color: #cfc7ff;\n  cursor: pointer;\n  font-size: 16px;\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n\n.waifu-panel-header .waifu-panel-back:hover {\n  background: rgba(139, 124, 255, 0.2);\n}\n\n.waifu-panel-close {\n  background: none;\n  border: none;\n  color: #9a93c4;\n  cursor: pointer;\n  font-size: 15px;\n  padding: 2px 6px;\n  border-radius: 6px;\n}\n\n.waifu-panel-close:hover {\n  background: rgba(255, 255, 255, 0.12);\n  color: #fff;\n}\n\n.waifu-panel-body {\n  flex: 1 1 auto;\n  min-height: 0;                 /* 关键：flex 子项允许收缩，否则长列表撑破 max-height 后被裁剪无法滚动 */\n  max-height: calc(70vh - 48px); /* 双保险：即使 flex 计算异常，body 本身也被限制为可滚区域 */\n  overflow-y: auto;\n  overscroll-behavior: contain;  /* 滚动不穿透到页面/后台容器 */\n  padding: 10px;\n  scrollbar-width: thin;\n  scrollbar-color: rgba(139, 124, 255, 0.4) transparent;\n}\n\n.waifu-panel-body::-webkit-scrollbar {\n  width: 6px;\n}\n\n.waifu-panel-body::-webkit-scrollbar-thumb {\n  background: rgba(139, 124, 255, 0.4);\n  border-radius: 3px;\n}\n\n.waifu-panel-body::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n/* --- 角色按钮 --- */\n#model-selection-panel-morfonica .model-option {\n  align-items: center;\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 10px;\n  color: #eee;\n  cursor: pointer;\n  display: flex;\n  gap: 10px;\n  margin-bottom: 6px;\n  padding: 6px 8px;\n  text-align: left;\n  transition: background 0.25s, border-color 0.25s, transform 0.15s;\n  width: 100%;\n}\n\n#model-selection-panel-morfonica .model-option:hover {\n  background: rgba(139, 124, 255, 0.18);\n  border-color: var(--accent, #8f7bff);\n  transform: translateX(2px);\n}\n\n#model-selection-panel-morfonica .model-option img {\n  border-radius: 8px;\n  display: block;\n  height: 44px;\n  object-fit: cover;\n  width: 44px;\n  background: rgba(255, 255, 255, 0.08);\n}\n\n#model-selection-panel-morfonica .model-option-text {\n  display: flex;\n  flex-direction: column;\n}\n\n#model-selection-panel-morfonica .model-option-name {\n  font-size: 14px;\n  font-weight: 600;\n}\n\n#model-selection-panel-morfonica .model-option-en {\n  color: #8f88b8;\n  font-size: 11px;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n}\n\n/* --- 换装按钮 --- */\n#texture-selection-panel-morfonica .waifu-panel-body {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 6px;\n}\n\n#texture-selection-panel-morfonica .texture-option {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 8px;\n  color: #ddd;\n  cursor: pointer;\n  font-size: 11px;\n  overflow: hidden;\n  padding: 0;\n  text-align: center;\n  transition: background 0.25s, border-color 0.25s, transform 0.15s;\n}\n\n#texture-selection-panel-morfonica .texture-option:hover {\n  background: rgba(139, 124, 255, 0.2);\n  border-color: #8f7bff;\n  transform: translateY(-2px);\n}\n\n#texture-selection-panel-morfonica .texture-option img {\n  aspect-ratio: 1 / 1;\n  display: block;\n  object-fit: cover;\n  width: 100%;\n  height: auto;\n  border-radius: 8px 8px 0 0;\n}\n\n#texture-selection-panel-morfonica .texture-option span {\n  display: block;\n  padding: 4px 2px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n#texture-selection-panel-morfonica .texture-option-text {\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  min-height: 56px;\n  font-size: 12px;\n}\n\n#texture-selection-panel-morfonica .texture-option-text span {\n  padding: 8px 4px;\n}\n\n/* ============ 摇晃动画 ============ */\n@keyframes shake {\n  2% { transform: translate(0.5px, -1.5px) rotate(-0.5deg); }\n  4% { transform: translate(0.5px, 1.5px) rotate(1.5deg); }\n  6% { transform: translate(1.5px, 1.5px) rotate(1.5deg); }\n  8% { transform: translate(2.5px, 1.5px) rotate(0.5deg); }\n  10% { transform: translate(0.5px, 2.5px) rotate(0.5deg); }\n  12% { transform: translate(1.5px, 1.5px) rotate(0.5deg); }\n  14% { transform: translate(0.5px, 0.5px) rotate(0.5deg); }\n  16% { transform: translate(-1.5px, -0.5px) rotate(1.5deg); }\n  18% { transform: translate(0.5px, 0.5px) rotate(1.5deg); }\n  20% { transform: translate(2.5px, 2.5px) rotate(1.5deg); }\n  22% { transform: translate(0.5px, -1.5px) rotate(1.5deg); }\n  24% { transform: translate(-1.5px, 1.5px) rotate(-0.5deg); }\n  26% { transform: translate(1.5px, 0.5px) rotate(1.5deg); }\n  28% { transform: translate(-0.5px, -0.5px) rotate(-0.5deg); }\n  30% { transform: translate(1.5px, -0.5px) rotate(-0.5deg); }\n  32% { transform: translate(2.5px, -1.5px) rotate(1.5deg); }\n  34% { transform: translate(2.5px, 2.5px) rotate(-0.5deg); }\n  36% { transform: translate(0.5px, -1.5px) rotate(0.5deg); }\n  38% { transform: translate(2.5px, -0.5px) rotate(-0.5deg); }\n  40% { transform: translate(-0.5px, 2.5px) rotate(0.5deg); }\n  42% { transform: translate(-1.5px, 2.5px) rotate(0.5deg); }\n  44% { transform: translate(-1.5px, 1.5px) rotate(0.5deg); }\n  46% { transform: translate(1.5px, -0.5px) rotate(-0.5deg); }\n  48% { transform: translate(2.5px, -0.5px) rotate(0.5deg); }\n  50% { transform: translate(-1.5px, 1.5px) rotate(0.5deg); }\n  52% { transform: translate(-0.5px, 1.5px) rotate(0.5deg); }\n  54% { transform: translate(-1.5px, 1.5px) rotate(0.5deg); }\n  56% { transform: translate(0.5px, 2.5px) rotate(1.5deg); }\n  58% { transform: translate(2.5px, 2.5px) rotate(0.5deg); }\n  60% { transform: translate(2.5px, -1.5px) rotate(1.5deg); }\n  62% { transform: translate(-1.5px, 0.5px) rotate(1.5deg); }\n  64% { transform: translate(-1.5px, 1.5px) rotate(1.5deg); }\n  66% { transform: translate(0.5px, 2.5px) rotate(1.5deg); }\n  68% { transform: translate(2.5px, -1.5px) rotate(1.5deg); }\n  70% { transform: translate(2.5px, 2.5px) rotate(0.5deg); }\n  72% { transform: translate(-0.5px, -1.5px) rotate(1.5deg); }\n  74% { transform: translate(-1.5px, 2.5px) rotate(1.5deg); }\n  76% { transform: translate(-1.5px, 2.5px) rotate(1.5deg); }\n  78% { transform: translate(-1.5px, 2.5px) rotate(0.5deg); }\n  80% { transform: translate(-1.5px, 0.5px) rotate(-0.5deg); }\n  82% { transform: translate(-1.5px, 0.5px) rotate(-0.5deg); }\n  84% { transform: translate(-0.5px, 0.5px) rotate(1.5deg); }\n  86% { transform: translate(2.5px, 1.5px) rotate(0.5deg); }\n  88% { transform: translate(-1.5px, 0.5px) rotate(1.5deg); }\n  90% { transform: translate(-1.5px, -0.5px) rotate(-0.5deg); }\n  92% { transform: translate(-1.5px, -1.5px) rotate(1.5deg); }\n  94% { transform: translate(0.5px, 0.5px) rotate(-0.5deg); }\n  96% { transform: translate(2.5px, -0.5px) rotate(-0.5deg); }\n  98% { transform: translate(-1.5px, -1.5px) rotate(-0.5deg); }\n  0%, 100% { transform: translate(0, 0) rotate(0); }\n}\n\n/* ============ 小屏适配 ============ */\n@media (max-width: 640px) {\n  #waifu-tips-morfonica {\n    width: 200px;\n    font-size: 13px;\n  }\n\n  #waifu-tool-morfonica {\n    right: 88px;\n  }\n\n  .waifu-panel {\n    width: min(300px, calc(100vw - 24px));\n    max-height: 60vh;\n  }\n\n  .waifu-panel-body {\n    max-height: calc(60vh - 48px);\n  }\n}\n";
		//#endregion
		//#region src/client/index.ts
		/** vendor 运行时脚本（host 同源路由，按依赖顺序加载）。
		*  Cubism 2.1 渲染链：live2d.min.js（框架，暴露 window.Live2D / Live2DModelWebGL）
		*  → pixi.min.js（PIXI 6）→ live2d-display.cubism2.min.js（pixi-live2d-display
		*  0.4.0 的 cubism2 版，运行时校验 window.Live2D 存在）。
		*  Cubism 2.1 不需要 live2dcubismcore.min.js（那是 Cubism 4 链的依赖）。
		*/
		const VENDOR_SCRIPTS = [
			"/mofu-assets/vendor/live2d.min.js",
			"/mofu-assets/vendor/pixi.min.js",
			"/mofu-assets/vendor/live2d-display.cubism2.min.js"
		];
		/** 桌宠容器与面板的 z-index 覆盖（dsh GUI 上方悬浮）+ 默认放右下（避开左侧栏）。 */
		const Z_INDEX_OVERRIDE = `
#waifu-morfonica, #waifu-toggle-morfonica { z-index: 2147483646 !important; }
.waifu-panel { z-index: 2147483647 !important; }
#waifu-morfonica { left: auto; right: 20px; top: 460px; bottom: auto; }
`;
		function loadScript(src) {
			return new Promise((resolve, reject) => {
				const tag = document.createElement("script");
				tag.src = src;
				tag.onload = () => resolve();
				tag.onerror = () => reject(/* @__PURE__ */ new Error(`加载 ${src} 失败`));
				document.head.appendChild(tag);
			});
		}
		/** 插件入口：注入 CSS + 按序加载运行时 + 启动桌宠；清理注册为 ctx.effect disposer。 */
		function apply(ctx) {
			ctx.effect(() => {
				const cleanup = [];
				let disposed = false;
				const stop = () => {
					if (disposed) return;
					disposed = true;
					for (const fn of cleanup) try {
						fn();
					} catch {}
					cleanup.length = 0;
				};
				const style = document.createElement("style");
				style.id = "live2d-morfonica-css";
				style.textContent = waifuCss_default + Z_INDEX_OVERRIDE;
				document.head.appendChild(style);
				cleanup.push(() => style.remove());
				(async () => {
					for (const src of VENDOR_SCRIPTS) {
						await loadScript(src);
						if (disposed) return;
					}
					if (disposed) return;
					try {
						await initWidget({
							cdnPath: "/mofu-assets/",
							preload: "IDLE",
							tools: [
								"switch-model",
								"photo",
								"info",
								"quit"
							]
						});
					} catch (error) {
						console.error("[live2d-morfonica 桌宠启动失败", error);
					}
				})();
				return stop;
			}, "live2d-morfonica: widget");
		}
		//#endregion
		exports.apply = apply;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map