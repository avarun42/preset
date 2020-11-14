import { inject, injectable } from 'inversify';
import { Binding, Bus, Contextualized, Hook, HandlerContract, Name } from '@/exports';
import { color, contextualizeValue, wrap } from '@/Support/utils';

@injectable()
export class HookHandler implements HandlerContract {
  public name = Name.Handler.Hook;

  @inject(Binding.Bus)
  protected bus!: Bus;

  async handle(action: Contextualized<Hook>): Promise<void> {
    const hooks = wrap(action.hooks);
    this.bus.debug(`Running ${color.magenta(hooks.length.toString())} hook(s).`);

    for (const hook of hooks) {
      this.bus.debug(`Running callabck #${color.magenta(hooks.indexOf(hook).toString())}.`);
      await contextualizeValue(hook).callback?.(action.preset);
    }
  }
}
