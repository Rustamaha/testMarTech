/**
 * Проверяет, является ли текст электронной почтой или нет
 */
export function isEmail(value: string) {
  // https://github.com/yiminghe/async-validator/blob/master/src/rule/type.ts#L9
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/;
  return (
    typeof value === "string" &&
    value.length <= 320 &&
    !!value.match(emailPattern)
  );
}

/**
 * Делает задержку на данное кол-во мс
 */
export async function sleep(ms: number) {
  await new Promise((r) => setTimeout(r, ms));
}
