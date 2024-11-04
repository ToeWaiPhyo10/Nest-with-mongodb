import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  @Roles(Role.Admin, Role.Moderator)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllBooks(@Query() query: ExpressQuery) {
    return this.bookService.findAll(query);
  }
  @Post()
  @UseGuards(AuthGuard())
  async createBook(
    @Body()
    book: CreateBookDto,
    @Req() req,
  ): Promise<Book> {
    return this.bookService.create(book, req.user);
  }
  @Get(':id')
  async getBook(@Param('id') id: string) {
    return this.bookService.findByid(id);
  }
  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() book: UpdateBookDto) {
    return this.bookService.updateById(id, book);
  }
  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.bookService.deleteById(id);
  }
}
